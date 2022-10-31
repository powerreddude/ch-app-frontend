import axios from "axios";
import APIURL from "../APIURL";

export default async function getMessages({ channelId, limit, offset }) {
  const res = await axios.get(`${APIURL}/api/messages/messages`, { params: { channelId, limit, offset } });

  const messages = res.data.messages;

  return messages;
}