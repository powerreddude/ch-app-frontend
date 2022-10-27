import axios from "axios";
import APIURL from "../APIURL";

export default async function getMe() {
  const res = await axios.get(`${APIURL}/api/users/me`);

  const user = res.data.user;

  return user;
}