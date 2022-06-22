//"styled-components" install
//'socket.io-client' install
import React, {useCallback, useEffect, useRef} from "react";
import styled from "styled-components";
import io from'socket.io-client'

const VVVVV = () => {

  var myStream;
  var pc;
  const socket = io("http://3.38.104.48:4000")

  const ref = useRef();
  const otherRef = useRef();

  const id = "abcd";

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

    pc = new RTCPeerConnection({
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
  };
  const handleIce = (data) =>  {
    socket.emit("ice", data.candidate, id);
  }

  const handleAddStream = (data) => {
    otherRef.current.srcObject = data.stream;
  }

  const init = async () => {
    await getMedia();
    makeConnet()
    socket.emit("join", id);
    console.log(1)

    socket.on("welcome", async (e) => {

      const offer = await pc.createOffer();
      pc.setLocalDescription(offer);
      socket.emit("offer", offer, id);
      console.log(2)
    });

    socket.on("offer", async (offer) => {

      pc.setRemoteDescription(offer);
      const answer = await pc.createAnswer();
      pc.setLocalDescription(answer);

      socket.emit("answer", answer, id);
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

  return (
      <>
        <div>
          <VV ref={ref} autoPlay></VV>
          <VV ref={otherRef} autoPlay></VV>
        </div>
      </>
  )
}

const VV=styled.video`
  width: 100px;
  height: 200px;
`

export default VVVVV;