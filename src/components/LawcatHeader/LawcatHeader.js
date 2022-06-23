import header_lawcat from '../../images/header_lawcat.png';
import styledcat from '../../images/styledcat.png';
import { NavLink } from 'react-router-dom';
import home from '../../images/home.png';
import lawchat from '../../images/lawchat.png';
import customerservice from '../../images/customerservice.png';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const LawcatHeader = () => {
  const currentUrl = window.location.pathname;

  const returnImgName = (title) => {
    if (title === '홈') {
      return home;
    } else if (title === '법률 상담') {
      return lawchat;
    } else if (title === '고객문의') {
      return lawchat;
    }
  };

  // const MenuBox = [
  //   { link: '/Lawchat', title: '법률 상담' },
  //   { link: '/CustomerService', title: '고객문의' },
  //   { link: '/Setting', title: '설정' },
  //   { link: '/LoginTest', title: localStorage.getItem("userId") || '로그인'   },
  // ];

  // 로그인 안하면, 로그인 페이지로
  const userId = localStorage.getItem('userId');

  const MenuBox = [
    { link: userId ? '/Lawchat' : '/Login', title: '법률 상담' },
    { link:'/VideoMeeting',  title: '화상 상담' },
    { link: userId ? '/CustomerService' : '/Login', title: '고객문의' },
    { link: userId ? '/Login' : '/Login', title: userId || '로그인' },
  ];

  const handleLogout = (e) => {
    if (
      e.target.title !== '법률 상담' &&
      e.target.title !== '고객문의' &&
      userId
    ) {
      e.preventDefault();
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
      window.location.href = '/';
    }
  };
  const MenuList = MenuBox.map((menu, idx) => (
    <li
      className="App_MenuList"
      key={idx}
      style={menu.title === '로그인' ? { fontWeight: 'bold' } : null}
    >
      <NavLink
        className="App_MenuList_NavLink"
        exact
        to={menu.link}
        activeClassName="active"
        title={menu.title}
        onClick={handleLogout}
      >
        {menu.title}
      </NavLink>
    </li>
  ));

  return (
    <>
      <div id="LawcatHeader">
        <NavLink exact to="/" activeClassName="active">
          <img id="header_lawcat" src={header_lawcat} alt="header lawcat"></img>
          <img
            id="header_styledcat"
            src={styledcat}
            alt="header styledcat"
          ></img>
        </NavLink>
        <ul className="App_tabs">{MenuList}</ul>
      </div>
    </>
  );
};

const LoginErr = styled.h1`
  position: absolute;
  top: 10%;
  left: 47%;

  color: red;
`;
export default LawcatHeader;
