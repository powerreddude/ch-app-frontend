import axios from "axios";
import APIURL from "../APIURL";

export default async function getMembers({ serverId }) {
  const res = await axios.get(`${APIURL}/api/servers/members`, { params: { serverId } });

  if(res.data.error) {
    console.error(res.data.message);
    throw res.data.message;
  }

  const members = res.data.members;

  return members;
}