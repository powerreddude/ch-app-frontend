export default function Modal({ children, open }) {
  if(!open) {return}

  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 flex flex-col justify-center">
      </div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 origin-center text-zinc-50 opacity-100 bg-zinc-700 rounded-lg p-4 border-2 border-zinc-600">
        {children}
      </div>
    </div>
  )
}