import axios from "axios";
import APIURL from "../APIURL";

export default async function postMessage({ channelId, content }) {
  const res = await axios.post(`${APIURL}/api/messages/message`, { content, channelId });

  if(res.data.error) {
    console.error(res.data.message);
    throw res.data.message;
  }

  const message = res.data.message;

  return message;
}