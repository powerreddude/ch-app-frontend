import axios from "axios";
import APIURL from "../APIURL";

export default async function postChannel({ name, serverId }) {
  const res = await axios.post(`${APIURL}/api/channels/channel`, { name, serverId });

  if(res.data.error) {
    console.error(res.data.message);
    throw res.data.message;
  }

  const channel = res.data.channel;

  return channel;
}