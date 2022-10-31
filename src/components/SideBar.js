import { useState } from "react"

export default function SideBar({ children, left }) {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="text-zinc-50">
      <div className={`${left ? "float-right" : "float-left"} flex flex-col items-center w-10 h-full bg-zinc-800`}>
        {(left && open) || (!left && !open) ?
        <div className="w-8 h-8 mt-2 hover:bg-zinc-700 rounded-full cursor-pointer" onClick={() => {setOpen(!open)}}>
          <svg style={{ width: "inherit", height:"inherit", paddingRight:".25rem" }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </div>

          :
          <div className="w-8 h-8 mt-2 hover:bg-zinc-700 rounded-full cursor-pointer" onClick={() => {setOpen(!open)}}>
            <svg style={{ width: "inherit", height:"inherit", paddingLeft:".25rem" }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </div>

        }
      </div>
      <div className={`flex flex-col h-full transition-all overflow-hidden ${open ? 'w-80' : 'w-0'}`}>
        {children}
      </div>
    </div>
    
    )
}
