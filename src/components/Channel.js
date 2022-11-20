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
            className="pb-2"
          >
            {
              messages.map((message, index, array) => {
                if(array[index + 1]) {
                  var userSame = message.userId === array[index + 1].userId;
                  var sameTimeBlock = Math.floor(Date.parse(message.createdAt) / 30000) === Math.floor(Date.parse(array[index + 1].createdAt) / 30000);
                } else {
                  var userSame = false;
                  var sameTimeBlock = false;
                }

                return (
                  <Message key={message.id} title={ !userSame || !sameTimeBlock } message={message}></Message>
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