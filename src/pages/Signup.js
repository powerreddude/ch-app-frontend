import { Link, Navigate } from "react-router-dom";

export default function Signup({ authed, onSubmit }) {
  if (authed) {
    return <Navigate to={'/'} replace/>;
  }

  return (
    <div className="flex flex-col justify-center h-full w-full">
      <div className='flex flex-col p-4 mx-auto rounded-md bg-zinc-700 shadow-lg'>
        <form onSubmit={onSubmit} className='text-zinc-900 flex flex-col space-y-4'>
          <div className="flex justify-center">
            <Link to='/'>
              <img className="w-14 h-14" src="logo.svg" alt="Logo"/>
            </Link>
          </div>
          <h3 className="font-bold text-2xl text-zinc-300">Signup</h3>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="appearance-none focus:outline-none p-1 rounded-md"
            placeholder="Email"
          />
          <input
            id="password"
            name="password"
            type="password"
            required
            className="appearance-none focus:outline-none p-1 rounded-md"
            placeholder="Password"
          />
          <input
            id="name"
            name="name"
            type="text"
            required
            className="appearance-none focus:outline-none p-1 rounded-md"
            placeholder="Name"
          />
          <input
            id="key"
            name="key"
            type="text"
            required
            className="appearance-none focus:outline-none p-1 rounded-md"
            placeholder="Alpha Key"
          />

          <button type="submit" className="bg-violet-500 rounded-md hover:bg-violet-600">Submit</button>
        </form>
      </div>
    </div>
  )
}