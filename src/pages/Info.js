import CenterIsland from "../components/CenterIsland"

export default function Info({  }) {
  return (
    <CenterIsland>
      <div className="w-100 flex justify-center">
        <img className="w-20 h-20" src="logo.svg" alt="Logo"/>
      </div>
      <div className="bold text-3xl">
        Welcome to ch-app!
      </div>
      <div className="px-2 text-left">
        Ch-app is a chat-application designed and produced by Donnis Moore. It is currently a side project so don't expect new freatures on a regular schedule. Below you can find a list of all the supported features in ch-app. If you have any sugestions for improvments contact @Donn on ch-app.
      </div>
    </CenterIsland>
  )
}