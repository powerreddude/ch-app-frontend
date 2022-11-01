import axios from "axios";
import APIURL from "../APIURL";

export default async function getInvite({ serverId }) {
  const res = await axios.get(`${APIURL}/api/servers/invite`, { params: { serverId } });

  const invite = res.data.invite;

  return invite;
}