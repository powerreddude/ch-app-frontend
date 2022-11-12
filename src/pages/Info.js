export default function Info({  }) {
  return (
    <div className="text-zinc-50 flex flex-col h-full gap-2 sm:mx-28 md:mx-48 lg:mx-64 xl:mx-80 pt-4">
      <div className="w-100 flex justify-center">
        <img className="w-20 h-20" src="logo.svg" alt="Logo"/>
      </div>
      <div className="bold text-3xl">
        Welcome to ch-app!
      </div>
      <div className="px-2 text-left">
        Ch-app is a chat-application designed and produced by Donnis Moore. It is currently a side project so don't expect new freatures on a regular schedule. Below you can find a list of all the supported features in ch-app. If you have any sugestions for improvments contact @Donn on ch-app.
      </div>
      <div className="flex justify-start text-left mt-8">
        <ul className="list-disc">
          <li>
            Servers
            <ul className="ml-8">
              <li>
                Creating channels
              </li>
              <li>
                Inviting users
              </li>
              <li>
                Realtime updates
              </li>
            </ul>
          </li>
          <li>
            Channels
            <ul className="ml-8">
              <li>
                Sending messages
              </li>
              <li>
                Realtime updates
              </li>
            </ul>
          </li>
          <li>
            Friends 
            <ul className="ml-8">
              <li>
                DM channels
              </li>
              <li>
                Realtime updates
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  )
}