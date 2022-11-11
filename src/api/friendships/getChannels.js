import axios from "axios";
import APIURL from "../APIURL";

export default async function getChannels() {
  const res = await axios.get(`${APIURL}/api/friendships/channels`);

  if(res.data.error) {
    console.error(res.data.message);
    throw res.data.message;
  }

  const channels = res.data.channels
  return channels;
}