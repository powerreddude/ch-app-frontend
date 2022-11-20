export default function Message({ title, message }) {
  return (
    <div className={`flex ${title ? "mt-2" : null} items-start`}>
      {title ? 
      <div className="w-12 h-12 mx-2 shrink-0 flex justify-center items-center">
        {message.user && message.user.icon ? <img className="rounded-full object-cover w-full h-full" src={`/api/icons/user?filename=${message.user.icon}`}></img> : <img className="object-cover w-6 h-9" src={`/logo.svg`}></img>}
      </div>
      : null}
      <div className="flex flex-col grow text-zinc-50 min-w-0 text-left">
        {title ?
        <div className="flex justify-between border-b-2 border-zinc-600">
          <div className="font-bold text-left">
            {message.user ? message.user.name : 'Unknown User'}
          </div>
          <div className="mx-2 text-zinc-400 text-sm">
            {new Date(Date.parse(message.createdAt)).toLocaleString('en-US')}
          </div>
        </div>

        : null}
        <div className={`break-words px-4 ${!title ? "pl-20" : null}`}>
          {message.content}
        </div>
      </div>
    </div>
  )
}