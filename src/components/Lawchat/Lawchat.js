import React, { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import {
  Attachment,
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  LoadingIndicator,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from 'stream-chat-react';
import axios from 'axios';
import '@stream-io/stream-chat-css/dist/css/index.css';
import {CustomPreview} from "./CustomPreview";
import * as PropTypes from "prop-types";

const filters = { type: 'counsel', members: { $in: ['john'] } };
const sort = { last_message_at: -1 };

Attachment.propTypes = {AttachmentActions: PropTypes.any};
const Lawchat = () => {
  const [chatClient, setChatClient] = useState(null);

  useEffect(() => {
    const initChat = async () => {
      const client = StreamChat.getInstance('ub4eg72ats6w');
      const tokenResponse = await axios.post(
        'http://118.67.130.115/api/signIn',
        {
          userId: 'john',
        },
      );
      console.log(tokenResponse);

      await client.connectUser(
        {
          id: 'john',
          name: 'john',
          image:
            'https://getstream.io/random_png/?id=delicate-queen-3&name=delicate-queen-3',
        },
        tokenResponse.data.token,
      );

      const [channelResponse] = await client.queryChannels(filters, sort);
      setChatClient(client);
    };

    initChat();
  }, []);

  if (!chatClient) {
    return <LoadingIndicator />;
  }

  const CustomAttachmentActions = (props) => {
    const { actions, type } = props;

    const handleClick = async (event, value?) => {
      console.log('hello')
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
  };

  const CustomAttachment = (props) => (
      <Attachment {...props} AttachmentActions={CustomAttachmentActions} />
  );

  return (
    <>
      <div id="App_container">
        <div id="Lawchat_container">
          <Chat client={chatClient}>
            <div id="Lawchat_ChannelList_container">
              <ChannelList filters={filters} sort={sort} Preview={CustomPreview}/>
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

export default Lawchat;
