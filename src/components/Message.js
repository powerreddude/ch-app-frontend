export default function Message({ message }) {
  return (
    <div className="flex my-1 items-start">
      <div className="w-12 h-12 mx-2 shrink-0">
        
      </div>
      <div className="flex flex-col text-zinc-50 min-w-0 text-left">
        <div className="font-bold text-left">
          {message.user ? message.user.name : 'Unknown User'}
        </div>
        <div className="break-words px-4">
          {message.content}
        </div>
      </div>
    </div>
  )
}