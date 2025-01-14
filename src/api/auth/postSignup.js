import axios from "axios";
import APIURL from "../APIURL";

export default async function postSignup({ email, password, name }) {
  const res = await axios.post(`${APIURL}/api/auth/signup`, { email, password, name });

  if(res.data.error) {
    console.error(res.data.message);
    throw res.data.message;
  }

  const user = res.data.user;

  return user;
}