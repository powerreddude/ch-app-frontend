import axios from "axios";
import APIURL from "../APIURL";

export default async function postJoin({ key }) {
  const res = await axios.post(`${APIURL}/api/servers/join`, { key });

  const server = res.data.server;
  return server;
}