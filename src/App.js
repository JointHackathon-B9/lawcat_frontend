import React from 'react';
import Home from './components/Home/Home.js';
import AIchat from './components/AIchat/AIchat.js';
import LawcatHeader from './components/LawcatHeader/LawcatHeader.js';
import Lawyerchat from './components/Lawyerchat/Lawyerchat.js';
import Setting from './components/Setting/Setting.js';
import CustomerService from './components/CustomerService/CustomerService.js';
import VideoMeeting from "./components/VideoMeeting/VideoMeeting";
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

const App = () => {
  const MenuBox = [
    { link: '/', title: '홈' },
    { link: '/AIchat', title: 'AI 상담' },
    { link: '/Lawyerchat', title: '변호사 상담' },
    { link: '/Setting', title: '설정' },
    { link: '/CustomerService', title: '고객문의' },
    { link: '/VideoMeeting', title: '화상 상담' },
  ];

  const MenuList = MenuBox.map((menu, idx) => (
    <li key={idx}>
      <NavLink exact to={menu.link} activeClassName="active">
        {menu.title}
      </NavLink>
    </li>
  ));

  return (
    <>
      {' '}
      <BrowserRouter>
        <LawcatHeader></LawcatHeader>
        <ul className="App_tabs">{MenuList}</ul>

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/AIchat/*" element={<AIchat />}></Route>
          <Route path="/Lawyerchat/*" element={<Lawyerchat />}></Route>
          <Route path="/Setting/*" element={<Setting />}></Route>
          <Route
            path="/CustomerService/*"
            element={<CustomerService />}
          ></Route>
          <Route path="/VideoMeeting/*" element={<VideoMeeting />}></Route>
          {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
          <Route path="*" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
