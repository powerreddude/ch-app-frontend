import axios from "axios";
import APIURL from "../APIURL";

export default async function postUser({ file }) {
  const form = new FormData();
  form.append('image', file, 'icon')
  const res = await axios.post(`${APIURL}/api/icons/user`, form, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  if(res.data.error) {
    console.error(res.data.message);
    throw res.data.message;
  }

  const icon = res.data.icon;

  return icon;
}