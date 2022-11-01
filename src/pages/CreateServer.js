import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

export default function CreateServer({ onSubmit, servers }) {
  const [created, setCreated] = useState(false);

  if(created) {return (<Navigate to={`/s`} replace/>)}

  return (
    <div className="flex flex-col justify-center h-full w-full">
    <div className='flex flex-col p-4 mx-auto rounded-md bg-zinc-700 shadow-lg'>
      <form onSubmit={ (e) => {
        setCreated(onSubmit(e));
        }} className='text-zinc-900 flex flex-col space-y-4'>
        <div className="flex justify-center">
          <Link to='/'>
            <img className="w-14 h-14" src="/logo.svg" alt="Logo"/>
          </Link>
        </div>
        <h3 className="font-bold text-2xl text-zinc-300">Create Server</h3>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="off"
          required
          className="appearance-none focus:outline-none p-1 rounded-md"
          placeholder="Server Name"
        />
        <input
          id="channelName"
          name="channelName"
          type="text"
          required
          className="appearance-none focus:outline-none p-1 rounded-md"
          placeholder="Channel Name"
        />

        <button type="submit" className="bg-violet-500 rounded-md hover:bg-violet-600">Create</button>
      </form>
    </div>
  </div>
  )
}