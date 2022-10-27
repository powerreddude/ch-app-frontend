import { Outlet } from "react-router-dom";
import Nav from "./Nav";


export default function NavRoute({ children }) {
  
  return (
    <div className='flex flex-col w-full h-full'>
      <Nav/>
      <div className="grow">
        { children ? children : <Outlet /> }
      </div>
    </div>
    )
}
