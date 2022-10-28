import { Outlet } from "react-router-dom";
import Nav from "./Nav";


export default function NavRoute({ children, user }) {
  
  return (
    <div className='flex flex-col w-full h-full'>
      <Nav user={user} />
      <div className="grow overflow-y-scroll scrollbar-hide">
        { children ? children : <Outlet /> }
      </div>
    </div>
    )
}
