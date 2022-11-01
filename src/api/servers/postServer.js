import axios from "axios";
import APIURL from "../APIURL";

export default async function postServer({ name, channelName }) {
  const res = await axios.post(`${APIURL}/api/servers/server`, { name, channelName });

  const server = res.data.server;
  return server;
}