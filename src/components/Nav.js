import { Link } from "react-router-dom";
import { Menu } from "@headlessui/react";
import Hamburger from "./Hamburger";
import { useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Nav({ }) {

  const [showMobile, setShowMobile] = useState(false);

  return (
    <nav className="bg-zinc-900 text-zinc-50">
      <div className="mx-auto mr-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <Link to='/'>
              <div className="flex items-center">
                <img className="w-14 h-14 pl-2 pb-2 pt-0.5" src="logo.svg" alt="Logo"/>
              </div>
            </Link>
            {/* primary */}
            <div className="hidden md:flex space-x-4 items-center">
              <Link className='pt-1.5 pb-2.5 hover:text-zinc-300' to='/'>Home</Link>
              <Link className='pt-1.5 pb-2.5 hover:text-zinc-300' to='/s'>Servers</Link>
            </div>
          </div>

          {/* secondary */}
          <div className="hidden md:flex space-x-4 items-center">
            <Link className='px-2 pt-1.5 pb-2.5 border-2 border-violet-800 hover:border-violet-900 rounded-md' to='/login'>Login</Link>
            <Link className='px-2 pt-1.5 pb-2.5 border-2 border-violet-800 bg-violet-800 rounded-md hover:bg-violet-900' to='/signup'>Signup</Link>
          </div>

          {/* mobile menu */}
          <div className="md:hidden flex items-center">
            <Hamburger shown={showMobile} onClick={() => {setShowMobile(!showMobile)}}/>
          </div>
        </div>
      </div>
      {/* make this flex and justify between */}
      <div className={`absolute w-full bg-zinc-900 transition-height md:hidden overflow-hidden flex flex-col justify-between ${showMobile ? 'h-44' : 'h-0'}`}>
        <Link className="block py-2 border-t border-zinc-800 grow" to="/">Home</Link>
        <Link className="block py-2 border-t border-zinc-800 grow" to="/s">Servers</Link>
        <Link className="block py-2 border-t border-zinc-800 grow" to="/login">Login</Link>
        <Link className="block py-2 border-t border-zinc-800 grow" to="/signup">Signup</Link>
      </div>
    </nav>
  )
}