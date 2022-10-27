import axios from "axios";
import APIURL from "../APIURL";

export default async function postLogin({ email, password}) {
  const res = await axios.post(`${APIURL}/api/auth/login`, { email, password });

  const user = res.data.user;
  console.log(user)
  return user;
}