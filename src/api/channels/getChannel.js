import axios from "axios";
import APIURL from "../APIURL";

export default async function getChannel({ channelId }) {
  const res = await axios.get(`${APIURL}/api/channels/channel`, { params: { channelId } });

  if(res.data.error) {
    console.error(res.data.message);
    throw res.data.message;
  }

  const channel = res.data.channel;

  return channel;
}