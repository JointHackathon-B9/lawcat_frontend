import header_lawcat from '../../images/header_lawcat.png';
import styledcat from '../../images/styledcat.png';
import { NavLink } from 'react-router-dom';
import home from '../../images/home.png';
import lawchat from '../../images/lawchat.png';
import customerservice from '../../images/customerservice.png';

const LawcatHeader = () => {
  const returnImgName = (title) => {
    if (title === '홈') {
      return home;
    } else if (title === '법률 상담') {
      return lawchat;
    } else if (title === '고객문의') {
      return lawchat;
    }
  };

  const MenuBox = [
    { link: '/Lawchat', title: '법률 상담' },
    { link: '/CustomerService', title: '고객문의' },
    { link: '/Login', title: '로그인' },
  ];

  const MenuList = MenuBox.map((menu, idx) => (
    <li className="App_MenuList" key={idx}>
      <NavLink
        className="App_MenuList_NavLink"
        exact
        to={menu.link}
        activeClassName="active"
      >
        {menu.title}
      </NavLink>
    </li>
  ));

  return (
    <>
      <div id="LawcatHeader">
        <NavLink exact to="/" activeClassName="active">
          {/* <div id="LawcatHeader_titlelogo">
            LawCat */}
          <img id="header_lawcat" src={header_lawcat} alt="header lawcat"></img>
          <img
            id="header_styledcat"
            src={styledcat}
            alt="header styledcat"
          ></img>
          {/* </div> */}
        </NavLink>
        <ul className="App_tabs">{MenuList}</ul>
      </div>
    </>
  );
};

export default LawcatHeader;
