import { useEffect, useState } from "react";
import getChannels from "../api/channels/getChannels";
import getMembers from "../api/servers/getMembers";
import Channel from "../components/Channel";
import SideBar from "../components/SideBar";
import Loading from "./Loading";

export default function Server({ server, socket }) {
  const [channels, setChannels] = useState([]);
  const [members, setMembers] = useState([]);
  const [activeChannel, setActiveChannel] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Promise.all([getChannels({ serverId: server.id }), getMembers({ serverId: server.id })]).then((res) => {
      setChannels(res[0]);
      setActiveChannel(res[0][0]);
      setMembers(res[1]);
      setLoaded(true);
    })
  }, [server])

  if(!loaded) {return (<Loading></Loading>)}

  return (
    <div className="flex h-full w-full">
      <SideBar left open={true}>
        {channels.map(channel => {
          return (
            <div key={channel.id} className={`${channel.id === activeChannel.id ? "drop-shadow-md text-zinc-50 bg-zinc-700" : "text-zinc-400"} text-ellipsis overflow-hidden m-1 px-1 rounded-xl cursor-pointer`} onClick={() => {setActiveChannel(channel); console.log(channel)}}>
              <abbr title={channel.name} className="border-b-0 no-underline">{channel.name}</abbr>
            </div>
          )
        })}
      </SideBar>
      <Channel key={activeChannel.id} channel={activeChannel} socket={socket}/>
      <SideBar open={true}>
        
      </SideBar>
    </div>
  )
}