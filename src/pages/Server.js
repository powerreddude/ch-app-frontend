import SideBar from "../components/SideBar";

export default function Server({ server }) {
  return (
    <div className="flex h-full">
      <SideBar left open={true}>

      </SideBar>
      <div className="grow bg-zinc-700">
        channel
      </div>
      <SideBar open={true}>
        
      </SideBar>
    </div>
  )
}