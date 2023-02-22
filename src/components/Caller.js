import { useEffect, useRef, useState } from "react";

export default function Caller({ channel, socket }) {
  const [peerConnections, setPeerConnections] = useState([]);
  const previousChannel = useRef();
  const stream = useRef();

  function startCall(channelId) {
    socket.emit("voice-start-call", channelId);
  }

  function endCall() {
    socket.emit("voice-end-call");
  }

  useEffect(() => {
    
    // Event called when someone joins the channel
    socket.on("voice-join", async (toId) => {
      if (!peerConnections.find((o) => o.userId === toId)) {
        console.log("join")
        const connection = new RTCPeerConnection({'iceServers': [
          {
            urls: 'stun:74.125.142.127:19302'
          },
          {
            urls: 'turn:openrelay.metered.ca:80',
            username: 'openrelayproject',
            credential: 'openrelayproject'
          }
        ]});

        stream.current.getTracks().forEach(track => {
          connection.addTrack(track, stream.current)
        });
        connection.ontrack = e => {
          // TODO tag each with id of user that it coresponds to 
          var sound      = document.createElement('audio');
          sound.controls = 'controls';
          sound.srcObject      = e.streams[0];
          sound.hidden = true;
          document.getElementById("root").appendChild(sound).play();
        }

        connection.onicecandidate = e => {
          console.log(e.candidate)
          if(e.candidate === null) {
            socket.emit("voice-offer", toId, connection.localDescription);
          }
        }

        connection.createOffer().then((o) => {connection.setLocalDescription(o)});
        
        setPeerConnections((peerConnections) => {return [...peerConnections, { userId: toId, connection: connection }]});
      }
    });

    //Event called after another client has ack that I joined
    socket.on("voice-offer", async (toId, offer) => {
      if (!peerConnections.find((o => o.userId === toId))) {
        console.log(offer)
        
        const connection = new RTCPeerConnection({'iceServers': [
          {
            urls: 'stun:74.125.142.127:19302'
          },
          {
            urls: 'turn:openrelay.metered.ca:80',
            username: 'openrelayproject',
            credential: 'openrelayproject'
          }
        ]});

        stream.current.getTracks().forEach(track => {
          connection.addTrack(track, stream.current)
        });
        connection.ontrack = e => {
          var sound      = document.createElement('audio');
          sound.controls = 'controls';
          sound.srcObject      = e.streams[0];
          sound.hidden = true;
          document.getElementById("root").appendChild(sound).play();
        }

        connection.setRemoteDescription(new RTCSessionDescription(offer));

        connection.onicecandidate = e => {
          console.log(e.candidate)
          if(e.candidate === null) {
            socket.emit("voice-answer", toId, connection.localDescription);
          }
        }

        connection.createAnswer().then((a) => { connection.setLocalDescription(a); });

        setPeerConnections((peerConnections) => {return [...peerConnections, { userId: toId, connection: connection }]});
      }
    });

    socket.on("voice-answer", (toId, answer) => {
      console.log("in answer")
      if (!peerConnections.find((o) => o.userId === toId && o.fin)) {
        const connection = peerConnections.find((o) => o.userId === toId);
        connection.connection.setRemoteDescription(new RTCSessionDescription(answer));
        connection.fin = true
      }
    });
    
  }, [])

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    .then(newStream => {
      stream.current = newStream
    });

    const run = async () => {
      if (channel && channel !== previousChannel.current) {
        if (previousChannel.current) {
          // leave-call
          // TODO add more to remove unused audio elements 
          peerConnections.forEach((connection) => {
            connection.connection.close();
          })
          setPeerConnections([]);
          endCall();
        }
  
        //start-call
        startCall(channel.id)
      }
  
      previousChannel.current = channel
    }

    run()

  }, [channel])
}