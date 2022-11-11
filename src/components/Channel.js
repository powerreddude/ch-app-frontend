import { useEffect, useRef, useState } from "react";
import MessageBar from "./MessageBar";
import Message from "./Message";
import InfiniteScroll from "react-infinite-scroll-component";
import getMessages from "../api/messages/getMessages";
import postMessage from "../api/messages/postMessage";
import Loading from "../pages/Loading";

export default function Channel({ channel, socket }) {
  const [messages, setMessages] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const prevChannel = useRef();

  useEffect(() => {
    getMessages({ channelId: channel.id, limit: 30 }).then(messages => {
      if(messages.length < 30) {setHasMore(false)}
      console.log(messages)
      setMessages(messages);
    })

    //unfollow events
    if(prevChannel.current) {
      socket.off(`channel-${prevChannel.current.id}`);
    }

    socket.on(`channel-${channel.id}`, (msg) => {
      const parsed = JSON.parse(msg);
      setMessages((messages) => !messages[0] || parsed.id > messages[0].id ? [parsed, ...messages] : messages)
    })
    

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
            hasMore={hasMore}
            loader={<div className="h-16 my-8"><Loading></Loading></div>}
            scrollableTarget={`channel-${channel.id}-scroller`}
            style={{ display: 'flex', flexDirection: 'column-reverse' }}
          >
            {
              messages.map((message, index, array) => {
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