import axios from "axios";
import APIURL from "../APIURL";

export default async function postFriendship({ addresseeId }) {
  const res = await axios.post(`${APIURL}/api/friendships/friendship`, { addresseeId });

  if(res.data.error) {
    console.error(res.data.message);
    throw res.data.message;
  }

  const friendship = res.data.friendship;

  return friendship;
}