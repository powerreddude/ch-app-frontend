import { Link } from "react-router-dom";
import HamburgerExample from "../../components/HamburgerExample";
import CenterIsland from "../../components/CenterIsland";

export default function UsersDocs({  }) {
  return (
    <CenterIsland>
        <h1 className="text-4xl">Users</h1>
        <div>
            Users are your way to interact with ch-app they are also your way to customize your experience and the way you are perceived.

        </div>

        <div className="border-t-2 mt-4 border-zinc-600">
            <h2 className="text-2xl">Creating Users</h2>
            <ul className=" list-decimal text-left">
                <li className="">Start by clicking the <Link className='mr-1 my-1 px-2 p-0.5 border-2 border-violet-800 bg-violet-800 rounded-md hover:bg-violet-900 hover:border-violet-800' to='/signup'>Signup</Link>
                 button in the top left corner of your screen or unfold the  <HamburgerExample/> icon to find the signup button (note this will not work if you are already signed in).</li>
                <li>Enter a name and email that are unique, and then a password.</li>
                <li>After signing up you'll be automatically signed in. Happy ch-atting!</li>
            </ul>
        </div>

        <div className="border-t-2 mt-4 border-zinc-600">
            <h2 className="text-2xl">User Icon</h2>
            <ul className=" list-decimal text-left">
                <li className="">Start by accessing your User settings by clicking your username in the top right corner or top middle on mobile.</li>
                <li className="">Upload your icon and click the upload button.</li>
                <li className="">Admire your new icon!</li>
            </ul>
        </div>

    </CenterIsland>
  )
}