import axios from "axios";
import APIURL from "../APIURL";

export default async function getMe() {
  const res = await axios.get(`${APIURL}/api/users/me`);

  if(res.data.error) {
    console.warn(res.data.message);
  }

  const user = res.data.user;

  return user;
}