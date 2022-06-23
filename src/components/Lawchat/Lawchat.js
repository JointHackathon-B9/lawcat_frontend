import React, { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import {
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  LoadingIndicator,
  MessageInput,
  MessageList,
  Thread,
  Window, useMessageContext,
  Attachment,
} from 'stream-chat-react';
import 'stream-chat-react/dist/css/index.css';
import axios from 'axios';
import LawyerList from "./LawyerList";
import styled from "styled-components";

const sort = { last_message_at: -1 };
const POST_LAWYER = "";

const Lawchat = () => {

  const [chatClient, setChatClient] = useState(null);
  const [lawyer, setLawyer] = useState(['john'])

  const filters = { type: 'counsel', members: { $in: ['john'] } };

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const clientKey = "ub4eg72ats6w"

  useEffect(() => {
    const initChat = async () => {

      console.log(userId);
      console.log(token);

      const client = StreamChat.getInstance(clientKey);
      await client.connectUser(
          {
            id: userId,
            name: userId,
            image:
                'https://getstream.io/random_png/?id=delicate-queen-3&name=delicate-queen-3',
          },
          token,
      );

      const [channelResponse] = await client.queryChannels(filters, sort);
      setChatClient(client);
    };

    initChat();
  }, []);

  if (!chatClient) {
    return <LoadingIndicator/>;
  }



  const CustomAttachmentActions = (props) => {
    const { actions, type } = props;

    const handleClick = async (event, value) => {
      axios.post(POST_LAWYER, {
        userId: userId,
        lawyerId: value,
        channelId: "",
      })
      setLawyer([...lawyer, value]);
    };

    return (
        <>
          {actions.map((action) => (
              <button onClick={(event) => handleClick(event, action.value)}>
                {action.value}
              </button>
          ))}
        </>
    );
  }

  const CustomAttachment = (props) =>{
      <Attachment {...props} AttachmentActions={CustomAttachmentActions} />
  }
    return (
        <>
          <div id="App_container">
            <div id="Lawchat_container">
              <Chat client={chatClient} theme="messaging light">
                <div id="Lawchat_ChannelList_container">
                  <ChannelListContainer>
                    <ChannelList filters={filters} sort={sort}/>
                  </ChannelListContainer>
                </div>
                <div id="Lawchat_Channel_container">
                  <Channel Attachment={CustomAttachment}>
                    <Window>
                      <ChannelHeader />
                      <MessageList />
                      <MessageInput />
                    </Window>
                    <Thread />
                  </Channel>
                </div>
              </Chat>
            </div>
          </div>
        </>
      );
  };
const ChannelListContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export default Lawchat;
