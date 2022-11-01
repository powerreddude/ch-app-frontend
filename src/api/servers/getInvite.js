import axios from "axios";
import APIURL from "../APIURL";

export default async function getInvite({ serverId }) {
  const res = await axios.get(`${APIURL}/api/servers/invite`, { params: { serverId } });

  if(res.data.error) {
    console.error(res.data.message);
    throw res.data.message;
  }

  const invite = res.data.invite;

  return invite;
}