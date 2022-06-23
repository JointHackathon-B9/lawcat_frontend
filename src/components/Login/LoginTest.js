import styled from "styled-components";
import {useState} from "react";
import axios from "axios";
import LawCatImg from '../../images/lawchat_ai_styledcat.png'
const Login = () => {

  const [userId, setUserId] = useState("");

  const handleLoginSubmit = (e) => {

    e.preventDefault();
    axios.post('http://118.67.130.115/api/signIn', {
      userId: userId,
    }).then( e => {
      console.log(e.data);
      localStorage.setItem("token", e.data.token)
    });

    localStorage.setItem("userId", userId )
  }

  const handleUserId = (e) => {
    setUserId(e.target.value)
  }

  return (
      <>
        <LoginContainer>
          <LoginBox>
            <LawCatImage src={LawCatImg} alt=""/>
            <IdInput placeholder="아이디" value={userId} onChange={handleUserId}/>
            <LoginSubmit  onClick={handleLoginSubmit}>로그인하기</LoginSubmit>
          </LoginBox>
        </LoginContainer>
      </>
  );
};
const LawCatImage = styled.img`
  width: 30%;
  height: 40%;
  margin-bottom: 10%;
`
const LoginBox = styled.div`
  display: flex;
  width: 50vw;
  height: 50vh;
  
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 2%;
  
  background: lightgray;
`
const LoginContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 70vh;
  
  justify-content: center;
  align-items: center;
  
`

const IdInput = styled.input`
  width: 40%;
  height: 5%;
  
  font-size: 2em;
`

const LoginSubmit = styled.button`
  margin-top: 3%;
  margin-bottom: 10%;
`

export default Login;
