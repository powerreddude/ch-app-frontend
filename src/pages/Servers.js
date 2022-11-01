import { Link } from "react-router-dom"

export default function Servers({ servers }) {

  return (
    <div className="grid pt-4 mx-20 xl:grid-cols-7 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2">
      {servers.map((server) => {
        return (
          <div key={server.id} className="flex justify-center py-4">
            <Link to={`/s/${server.id}`}>
              <div className="w-36 h-36 p-3 drop-shadow-xl rounded-xl bg-zinc-700">
                <img src={`/api/servers/icon?serverId=${server.id}`} className="w-full h-full rounded-full"/>
                <abbr title={server.name} className="relative bottom-4 text-zinc-50 px-1 shadow-xl bg-zinc-800 rounded-md overflow-hidden text-ellipsis max-w-36 border-b-0 no-underline block whitespace-nowrap">
                  {server.name}
                </abbr>
              </div>
            </Link>
          </div>
          )
      })}
      <div className="flex justify-center py-4">
        <Link to="/s/create">
          <div className="w-36 h-36 drop-shadow-xl p-3 rounded-xl bg-zinc-700 cursor-pointer">
            <div className="w-full h-full rounded-full bg-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
            <span className="relative bottom-4 text-zinc-50 px-1 shadow-xl bg-zinc-800 rounded-md">
              Create New
            </span>
          </div>
        </Link>
      </div>

    </div>
  )
}