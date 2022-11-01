import axios from "axios";
import APIURL from "../APIURL";

export default async function getChannels({ serverId }) {
  const res = await axios.get(`${APIURL}/api/channels/channels`, { params: { serverId } });

  if(res.data.error) {
    console.error(res.data.message);
    throw res.data.message;
  }

  const channels = res.data.channels;

  return channels;
}