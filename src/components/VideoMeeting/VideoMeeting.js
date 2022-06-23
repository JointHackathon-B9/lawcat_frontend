import React, {useCallback, useEffect, useRef} from "react";
import styled from "styled-components";
import io from'socket.io-client'
import CreateRoom from "./CreateRoom";

const VideoMeeting = (props) => {

  var myStream;
  // const socket = io("http://localhost:4000")
  const socket = io("http://3.38.104.48:4000")

  const ref = useRef();
  const otherRef = useRef();

  const roomId = props.roomId ? props.roomId : "test";

  let pc;

  const getMedia = async () =>  {
    const init = {
      audio : true,
      video : {facingMode: "user"}
    };
    try{

      myStream = await navigator.mediaDevices.getUserMedia(init);
      ref.current.srcObject = myStream;
    } catch (e) {

      console.log(e);
    }


  };

  const makeConnet= () => {

    const pc = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:3.35.220.190"
          ],
        },
      ],
    });

    pc.addEventListener("icecandidate", handleIce);
    pc.addEventListener("addstream", handleAddStream);

    // pc.onicecandidate = (e) => {
    //     if(e.candidate)
    //         socket.emit("ice", e.candidate)
    // };
    //
    // pc.ontrack = (e) => {
    //     if(otherRef.current)
    //         otherRef.current.srcObject = e.streams[0];
    // }
    if (myStream)
      myStream.getTracks().forEach((track) => pc.addTrack(track, myStream));

    return pc;
  };
  const handleIce = (data) =>  {
    socket.emit("ice", data.candidate, roomId);
  }

  const handleAddStream = (data) => {
    otherRef.current.srcObject = data.stream;
  }

  const init = async () => {
    await getMedia();
    socket.emit("join", roomId);
    console.log(1)

    socket.on("welcome", async (e) => {
      pc = makeConnet()

      const offer = await pc.createOffer();
      pc.setLocalDescription(offer);
      socket.emit("offer", offer, roomId);
      console.log(2)
    });

    socket.on("offer", async (offer) => {
      pc = makeConnet()
      pc.setRemoteDescription(offer);
      const answer = await pc.createAnswer();
      pc.setLocalDescription(answer);

      socket.emit("answer", answer, roomId);
      console.log(3)
    });

    socket.on("answer", async (answer) => {

      pc.setRemoteDescription(answer)
      console.log(4)
    });

    socket.on("ice", async (ice) => {

      console.log(5)
      if(pc)
        pc.addIceCandidate(ice);
    });

  }

  useEffect(() => {
    init();
  }, [])

  const SoundOff = () => {
    myStream.getAudioTracks().forEach( (track) => (track.enabled = !track.enabled));
  }

  const CameraOn = () => {
    myStream.getVideoTracks().forEach( (track) => (track.enabled = !track.enabled));
  }

  return (
    <>
      <div>
        <Container>
          <VV ref={ref} autoPlay></VV>
          <VV ref={otherRef} autoPlay></VV>
          <br/>
        </Container>
        <ButtonContainer>
          <Button onClick={SoundOff}>소리off</Button>
          <Button onClick={CameraOn}>카메라off</Button>
        </ButtonContainer>
      </div>
    </>
  )
}
const VV=styled.video`
  width: 35vw;
  border-radius: 3vw ;
`
const Button = styled.button`
  width: 20vw;
  height: 8vh;
  
  font-size: 3vw;
  background: antiquewhite;
  border-radius: 3vw ;
  margin: 0 5vw;
`

const Container = styled.div`
  width: 100vw;
  display: flex;
  
  margin: 10vh 10px;
  justify-content: space-evenly;
`
const ButtonContainer = styled.div`
  width: 100vw;
  display: flex;
  
  justify-content: center;
`
export default VideoMeeting;