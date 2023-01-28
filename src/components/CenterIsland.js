export default function CenterIsland({ children, className }) {
  return (
    <div className={`text-zinc-50 flex flex-col min-h-full gap-2 mx-6 sm:mx-28 md:mx-48 lg:mx-64 xl:mx-80 pt-4 ${className}`}>
      {children}  
    </div>
  )
}