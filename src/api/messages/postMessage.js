import axios from "axios";
import APIURL from "../APIURL";

export default async function postMessage({ channelId, content }) {
  const res = await axios.post(`${APIURL}/api/messages/message`, { content, channelId });

  const message = res.data.message;

  return message;
}