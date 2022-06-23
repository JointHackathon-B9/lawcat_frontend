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
} from 'stream-chat-react';
import 'stream-chat-react/dist/css/index.css';
import axios from 'axios';

const filters = { type: 'counsel', members: { $in: ['john'] } };
//변호사: id
const sort = { last_message_at: -1 };

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

  return (
      <>
        <div id="App_container">
          <div id="Lawchat_container">
            <Chat client={chatClient} theme="messaging light">
              <div id="Lawchat_ChannelList_container">
                <ChannelList filters={filters} sort={sort} />
              </div>

              <div id="Lawchat_Channel_container">
                <Channel>
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
