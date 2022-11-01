import axios from "axios";
import APIURL from "../APIURL";

export default async function getServers() {
  const res = await axios.get(`${APIURL}/api/servers/servers`);

  if(res.data.error) {
    console.error(res.data.message);
    throw res.data.message;
  }

  const servers = res.data.servers;

  return servers;
}