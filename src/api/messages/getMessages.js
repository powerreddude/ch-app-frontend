import axios from "axios";
import APIURL from "../APIURL";

export default async function getMessages({ channelId, limit, offset }) {
  const res = await axios.get(`${APIURL}/api/messages/messages`, { params: { channelId, limit, offset } });

  if(res.data.error) {
    console.error(res.data.message);
    throw res.data.message;
  }

  const messages = res.data.messages;

  return messages;
}