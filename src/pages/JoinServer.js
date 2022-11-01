import { useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";

export default function JoinServer({ onSubmit }) {
  const key = useParams().key;
  const [joined, setJoined] = useState(false);

  if(joined) {return (<Navigate to={`/s`} replace/>)}

  return (
    <div className="flex flex-col justify-center h-full w-full">
    <div className='flex flex-col p-4 mx-auto rounded-md bg-zinc-700 shadow-lg'>
      <div className='text-zinc-900 flex flex-col space-y-4'>
        <div className="flex justify-center">
          <Link to='/'>
            <img className="w-14 h-14" src="/logo.svg" alt="Logo"/>
          </Link>
        </div>
        <h3 className="font-bold text-2xl text-zinc-300">Join Server</h3>
        {key}
        <button onClick={() => {
          setJoined(onSubmit(key));
          }} type="submit" className="bg-violet-500 rounded-md hover:bg-violet-600">Join</button>
      </div>
    </div>
  </div>
  )
}