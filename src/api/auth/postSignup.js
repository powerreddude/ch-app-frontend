import axios from "axios";
import APIURL from "../APIURL";

export default async function postSignup({ email, password, name, key }) {
  const res = await axios.post(`${APIURL}/api/auth/signup`, { email, password, name, key });

  const user = res.data.user;
  console.log(user)
  return user;
}