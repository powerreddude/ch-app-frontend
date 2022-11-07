import axios from "axios";
import APIURL from "../APIURL";

export default async function getUsername({ name }) {
  const res = await axios.get(`${APIURL}/api/users/username`, { params: { name } });

  if(res.data.error) {
    console.error(res.data.message);
  }

  const user = res.data.user;

  return user;
}