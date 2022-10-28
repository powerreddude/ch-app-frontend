import axios from "axios";
import APIURL from "../APIURL";

export default async function getServers() {
  const res = await axios.get(`${APIURL}/api/servers/servers`);

  const servers = res.data.servers;
  return servers;
}