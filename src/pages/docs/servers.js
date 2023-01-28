import { Link } from "react-router-dom";
import CenterIsland from "../../components/CenterIsland";

export default function ServersDocs({  }) {
  return (
    <CenterIsland>
        <h1 className="text-4xl">Servers</h1>

        <div>
            Servers are how you interact with other users in a group setting. 

        </div>

        <div className="border-t-2 mt-4 border-zinc-600">
            <h2 className="text-2xl">Creating Servers</h2>
            <ul className=" list-decimal text-left">
                
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