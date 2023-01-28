import { Link } from "react-router-dom";
import CenterIsland from "../../components/CenterIsland";

export default function Docs({  }) {
  return (
    <CenterIsland className="items-center">
      <h1 className="text-4xl">Docs</h1>
      <div className="text-left">
        <ul className="list-disc">
          <li className="underline"><Link to='/docs/users'>Users</Link>
            <ul className="ml-8">
              <li><Link to='/docs/users#creating_users'>Creating Users</Link></li>
              <li><Link to=''>User Icon</Link></li>
            </ul>
          </li>
          <li className="underline"><Link to='/docs/servers'>Servers</Link>
            <ul className="ml-8">
              <li><Link to=''>Creating Server</Link></li>
              <li><Link to=''>Inviting User</Link></li>
            </ul>
          </li>
          <li className="underline"><Link to='/docs/channels'>Channels</Link>
            <ul className="ml-8">
              <li><Link to=''>Creating Channel</Link></li>
            </ul>
          </li>
          <li className="underline"><Link to='/docs/messages'>Messages</Link>
            <ul className="ml-8">
              <li><Link to=''>Creating Message</Link></li>
            </ul>
          </li>
          <li className="underline"><Link to='/docs/friendships'>Friendships</Link>
            <ul className="ml-8">
              <li><Link to=''>Creating Friendship</Link></li>
            </ul>
          </li>
        </ul>
      </div>
    </CenterIsland>
  )
}