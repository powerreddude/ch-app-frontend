import axios from "axios";
import APIURL from "../APIURL";

export default async function getChannels({ serverId }) {
  const res = await axios.get(`${APIURL}/api/channels/channels`, { params: { serverId } });

  const channels = res.data.channels;

  return channels;
}