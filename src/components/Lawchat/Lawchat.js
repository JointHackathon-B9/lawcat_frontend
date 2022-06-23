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
  Window,
  useMessageContext,
  Attachment,
} from 'stream-chat-react';
import 'stream-chat-react/dist/css/index.css';
import axios from 'axios';

const sort = { last_message_at: -1 };
const serverUrl = "http://118.67.130.115/api/"

const Lawchat = () => {
  const [chatClient, setChatClient] = useState(null);
  const [lawyer, setLawyer] = useState();

  useEffect(() => {
    axios.post('http://118.67.130.115/api/bot', {
      userId: localStorage.getItem('userId'),
    });
  });

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const clientKey = 'ub4eg72ats6w';

  const filters = { type: 'counsel', members: { $in: [userId] } };

  let lawyerId;

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
    return <LoadingIndicator />;
  }

  const CustomAttachmentActions = (props) => {
    const { actions, type } = props;

    const handleClick = async (event, value) => {
      lawyerId = value

      axios.post(serverUrl+"lawyer", {
        name: "lawyer1",
        keyword: "a",
      })

      axios.post(serverUrl+"lawyerChat", {
        userId: userId,
        lawyerId: lawyerId,
      })

      setLawyer([...lawyer, value]);
    };
    if (type === 'lawyer'){
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
                  <ChannelList filters={filters} sort={sort}/>
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
