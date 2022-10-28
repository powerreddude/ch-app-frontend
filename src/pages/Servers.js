import { Link } from "react-router-dom"

export default function Servers({ servers }) {
  return (
    <div className="grid pt-4 mx-20 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
      {servers.map((server) => {
        return (
          <div className="flex justify-center py-4">
            <Link to={`/s/${server.id}`}>
              <div className="w-40 h-40 p-3 rounded-xl bg-zinc-700" key={server.id}>
                <img src={`/api/servers/icon?serverId=${server.id}`} className="w-full h-full rounded-full"/>
                <span className="relative bottom-4 text-zinc-50 px-1 shadow-xl bg-zinc-800 rounded-md">
                  {server.name}
                </span>
              </div>
            </Link>
          </div>
          )
      })}
    </div>
  )
}