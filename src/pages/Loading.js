export default function Loading({  }) {
  return (
    <div className="w-full h-full flex justify-center text-zinc-50 text-lg">
      <div className="flex flex-col justify-center">
      <img className="w-20 h-20 pb-1.5 animate-spin" src="logo.svg" alt=""/>
      </div>
    </div>
  )
}