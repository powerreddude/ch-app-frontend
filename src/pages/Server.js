import { useEffect, useState } from "react";
import getChannels from "../api/channels/getChannels";
import getMembers from "../api/servers/getMembers";
import Channel from "../components/Channel";
import SideBar from "../components/SideBar";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import getInvite from "../api/servers/getInvite";

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

  const createInvite = () => {
    getInvite({ serverId: server.id }).then((invite) => {
      navigator.clipboard.writeText(`${window.location.origin}/s/join/${invite.key}`)
    })
  }

  if(!loaded) {return (<Loading></Loading>)}

  return (
    <div className="flex h-full w-full">
      <SideBar left stickyBottom={
        <div className="flex overflow-hidden justify-between w-full">
          <abbr title={server.name} className="font-bold border-b-0 no-underline text-ellipsis overflow-hidden">{server.name}</abbr>
          
          <div className="flex">
            <div className="cursor-pointer" onClick={createInvite}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
              </svg>
            </div>
            
            <Link className="" to={`/s/${server.id}/settings`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </Link>
          </div>

        </div>
      }>
        {channels.map(channel => {
          return (
            <div key={channel.id} className={`${channel.id === activeChannel.id ? "drop-shadow-md text-zinc-50 bg-zinc-700" : "text-zinc-400"} text-ellipsis overflow-hidden m-1 px-1 rounded-xl cursor-pointer`} onClick={() => {setActiveChannel(channel); console.log(channel)}}>
              <abbr title={channel.name} className="border-b-0 no-underline">{channel.name}</abbr>
            </div>
          )
        })}
      </SideBar>
      <Channel key={activeChannel.id} channel={activeChannel} socket={socket}/>
      <SideBar>
        
      </SideBar>
    </div>
  )
}