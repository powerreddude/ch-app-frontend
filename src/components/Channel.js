import { useEffect, useRef, useState } from "react";
import MessageBar from "./MessageBar";
import Message from "./Message";
import InfiniteScroll from "react-infinite-scroll-component";
import getMessages from "../api/messages/getMessages";
import postMessage from "../api/messages/postMessage";

export default function Channel({ channel, socket }) {
  const [messages, setMessages] = useState([]);
  const prevChannel = useRef();
  //const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getMessages({ channelId: channel.id }).then(messages => {
      setMessages(messages);
    })

    if(prevChannel.current) {
      //unfollow events
      socket.off(`channel-${prevChannel.current.id}`);

      socket.on(`channel-${channel.id}`, (msg) => {
        const parsed = JSON.parse(msg);
        console.log(parsed)
        setMessages((messages) => !messages[0] || parsed.id > messages[0].id ? [parsed, ...messages] : messages)
      })
    }

    prevChannel.current = channel;
  }, [channel]);
  
  const fetchMoreMessages = () => {
    getMessages({ channelId: channel.id, offset: messages.length + 1, limit: 10 }).then(newMessages => {
      setMessages(messages.concat(newMessages))
    })
  }

  const sendMessage = (e) => {
    e.preventDefault();
    const content = e.target.message.value;
    e.target.message.value = "";

    if(!content) {return}

    postMessage({ channelId: channel.id, content }).then(message => {

    });
  }

  
  return (
    <div className="grow h-full bg-zinc-700 flex flex-col min-w-0">
      <div className="flex flex-col overflow-auto grow">
        <div id={`channel-${channel.id}-scroller`} className="messages overflow-auto flex flex-col-reverse grow">
            
          <InfiniteScroll
            dataLength={messages.length}
            inverse={true}
            next={fetchMoreMessages}
            scrollThreshold={0.8}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            scrollableTarget={`channel-${channel.id}-scroller`}
            style={{ display: 'flex', flexDirection: 'column-reverse' }}
          >
            {
              messages.map((message, index, array) => {
                if(message.user.id === array[index - 1]) {}
                return (
                  <Message key={message.id} message={message}></Message>
                )
              })
            }
          </InfiniteScroll>
        </div>
      </div>
      <MessageBar onSubmit={sendMessage}>

      </MessageBar>
    </div>
  )
}