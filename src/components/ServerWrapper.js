import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../pages/Loading";
import Server from "../pages/Server";

export default function ServerWrapper({ servers, user, socket }) {
  const [server, setServer] = useState(null)
  const serverId = useParams().server;

  useEffect(() => {
    setServer(servers.find(s => s.id === serverId))
  }, [servers])
  
  if(!server) {return <Loading></Loading>}

  return (
    <Server server={server} user={user} socket={socket}></Server>
  )
}