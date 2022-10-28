import { useState } from "react"

export default function SideBar({ children, left }) {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="text-zinc-50">
      <div className={`${left ? "float-right" : "float-left"} flex flex-col items-center w-16 h-full bg-zinc-800`}>
        {(left && open) || (!left && !open) ?
        <div className="w-10 h-10 mt-2 rounded-full bg-zinc-600 shadow-lg" onClick={() => {setOpen(!open)}}>
          <svg style={{ width: "inherit", height:"inherit", paddingRight:".25rem" }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </div>

          :
          <div className="w-10 h-10 mt-2 rounded-full bg-zinc-600 shadow-lg" onClick={() => {setOpen(!open)}}>
            <svg style={{ width: "inherit", height:"inherit", paddingLeft:".25rem" }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </div>

        }
      </div>
      <div className={`flex h-full transition-all ${open ? 'w-80' : 'w-0'}`}>
        {children}
      </div>
    </div>
    
    )
}
