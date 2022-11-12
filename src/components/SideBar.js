import { useState } from "react"
import Chevron from "./Chevron";

export default function SideBar({ children, stickyBottom, left }) {
  const [open, setOpen] = useState(false);
  
  return (
    <div className={`h-full relative transition-all md:mr-0 md:translate-x-0 ${left ? "mr-10" : "mr-10"} ${open && !left ? '-translate-x-80': ''}`}>
    <div className={`text-zinc-50 shrink-0 h-full flex absolute md:static bg-zinc-800 ${open ? 'w-90': ''}`}>
      {
        left ?
        <div className={`flex flex-col shrink-0 whitespace-nowrap h-full transition-all overflow-x-hidden overflow-y-scroll scrollbar-hide ${open ? 'w-80' : 'w-0'}`}>
        <div className="grow overflow-y-scroll scrollbar-hide">
          {children}
        </div>
        <div className="flex mb-2 mx-1 h-8">
          {stickyBottom}
        </div>
      </div>
      :
      <></>
      }

      <div className={`${left ? "float-right" : "float-left"} flex flex-col items-center w-10 h-full bg-zinc-800`}>
        
        {(left) ?
          <Chevron shown={open} onClick={() => {setOpen(!open)}}/>
          :
          <Chevron shown={!open} onClick={() => {setOpen(!open)}}/>
        }


      </div>
      {
        !left ?
        <div className={`flex flex-col shrink-0 whitespace-nowrap h-full transition-all overflow-x-hidden overflow-y-scroll scrollbar-hide ${open ? 'w-80' : 'w-0'}`}>
        <div className="grow overflow-y-scroll scrollbar-hide">
          {children}
        </div>
        <div className="flex mb-2 mx-1 h-8">
          {stickyBottom}
        </div>
      </div>
      :
      <></>
      }

    </div>
    </div>
    
    
    )
}
