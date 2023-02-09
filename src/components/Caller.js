import { useEffect, useRef } from "react";

export default function Caller({ channel, socket }) {
  const peerConnections = useRef([]);
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
      if (!peerConnections.current.find((o) => o.userId === toId)) {
        console.log("join")
        const connection = new RTCPeerConnection();

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

        connection.onicecandidate = e => console.log(connection.localDescription)
        connection.createOffer().then((o) => {connection.setLocalDescription(o)});
        
        peerConnections.current.push({ userId: toId, connection: connection });

        setTimeout(() => { socket.emit("voice-offer", toId, connection.localDescription); console.log("sent offer"); }, 1000)
      }
    });

    //Event called after another client has ack that I joined
    socket.on("voice-offer", async (toId, offer) => {
      if (!peerConnections.current.find((o => o.userId === toId))) {
        console.log(offer)
        
        const connection = new RTCPeerConnection();


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

        peerConnections.current.push({ userId: toId, connection: connection });

        connection.createAnswer().then((a) => { connection.setLocalDescription(a); });
        
        setTimeout(() => { socket.emit("voice-answer", toId, connection.localDescription); console.log("sent answer"); }, 1000)
      }
    });

    socket.on("voice-answer", (toId, answer) => {
      console.log("in answer")
      if (!peerConnections.current.find((o) => o.userId === toId && o.fin)) {
        const connection = peerConnections.current.find((o) => o.userId === toId);
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
          peerConnections.current.forEach((connection) => {
            connection.connection.close();
          })
          peerConnections.current = [];
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