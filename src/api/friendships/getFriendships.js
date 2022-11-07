import axios from "axios";
import APIURL from "../APIURL";

export default async function getFriendships() {
  const res = await axios.get(`${APIURL}/api/friendships/friendships`);

  if(res.data.error) {
    console.error(res.data.message);
    throw res.data.message;
  }

  const friendships = res.data.friendships;

  return friendships;
}