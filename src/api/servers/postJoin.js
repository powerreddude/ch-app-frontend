import axios from "axios";
import APIURL from "../APIURL";

export default async function postJoin({ key }) {
  const res = await axios.post(`${APIURL}/api/servers/join`, { key });

  if(res.data.error) {
    console.error(res.data.message);
    throw res.data.message;
  }

  const server = res.data.server;

  return server;
}