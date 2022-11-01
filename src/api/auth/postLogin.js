import axios from "axios";
import APIURL from "../APIURL";

export default async function postLogin({ email, password}) {
  const res = await axios.post(`${APIURL}/api/auth/login`, { email, password });

  if(res.data.error) {
    console.error(res.data.message);
    throw res.data.message;
  }

  const user = res.data.user;

  return user;
}