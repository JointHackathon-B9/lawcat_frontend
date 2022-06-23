import React, {useEffect} from "react"
import {StreamChat} from "stream-chat";
import axios from "axios";
import {ChannelList} from "stream-chat-react";

const sort = { last_message_at: -1 };

//로그인 구현 이후, 교체
// const userId = localStorage.getItem(userId)
let userId = 'ub4eg72ats6w';
let lawyerId = "john";
let channelId;

const GETLAYERTOKEN_REQUST="http://118.67.130.115/api/signIn";

const LawyerList = (props) => {
  let filters = { type: 'counsel', members: { $in: props.lawerIdList } };

  useEffect(() => {
    const initChat = async () => {

      //이용자.
      const client = StreamChat.getInstance(userId);

      //이용자 권한 토큰 JWT
      const Response = await axios.post(

          GETLAYERTOKEN_REQUST,
          {
            userId: lawyerId,
          },
      );

      console.log(Response);

      // 토큰으로 API  연결
      await client.connectUser(
    {
            id: lawyerId,
            name: lawyerId,
            image: 'https://getstream.io/random_png/?id=delicate-queen-3&name=delicate-queen-3',
          },
          Response.data.token,
      );

      const [channelResponse] = await client.queryChannels(filters, sort);
    };

    initChat();
  }, []);

  return (
      <>
        <ChannelList filters={filters} sort={sort} />
      </>
  )
}

export default LawyerList