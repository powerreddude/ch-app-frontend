import { useEffect, useState } from 'react';
import postFriendship from '../api/friendships/postFriendship';
import Channel from '../components/Channel';
import Modal from '../components/Modal';
import SideBar from '../components/SideBar';
import Loading from './Loading';
import { Link } from 'react-router-dom';
import getUsername from '../api/users/getUsername';

export default function Home({ socket, friendships, channels }) {
  const [activeChannel, setActiveChannel] = useState(null);
  const [loaded, setLoaded] = useState(true);
  const [openAddFriendModal, setOpenAddFriendModal] = useState(false);

  useEffect(() => {

  }, [])

  const onAddFriend = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;

    const user = await getUsername({ name: name });

    if(user) {
      const friendship = await postFriendship({ addresseeId: user.id });

      console.log(friendship);
    }
  }

  if(!loaded) {return (<Loading></Loading>)}

  return (
    <div className="flex h-full">
      <SideBar left stickyBottom={
        <div className="flex overflow-hidden justify-between w-full items-center rounded-md drop-shadow-xl bg-zinc-700 px-1">
          <div className="cursor-pointer" onClick={() => {setOpenAddFriendModal(true)}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
            </svg>
          </div>

        </div>
      }>
        <div className='w-full'>
          {
            channels  ?
            channels.map(channel => {
              return (
                <div key={channel.id} className={`${activeChannel && channel.id === activeChannel.id ? "drop-shadow-md text-zinc-50 bg-zinc-700" : "text-zinc-400"} text-ellipsis overflow-hidden m-1 px-1 rounded-xl cursor-pointer`} onClick={() => {setActiveChannel(channel)}}>
                  <abbr title={channel.name} className="border-b-0 no-underline">{channel.name}</abbr>
                </div>
              )
            })
            :
            <></>
          }
        </div>
      </SideBar>
      {
        activeChannel ?
        <Channel key={activeChannel.id} channel={activeChannel} socket={socket}/>
        :
        <div className='grow h-full bg-zinc-700'></div>
      }

      <Modal open={openAddFriendModal}>
        <form onSubmit={onAddFriend} className='text-zinc-900 flex flex-col space-y-4'>
          <div className="flex justify-start" onClick={() => {setOpenAddFriendModal(false)}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <div className="flex justify-center">
            <Link to='/'>
              <img className="w-14 h-14" src="/logo.svg" alt="Logo"/>
            </Link>
          </div>
          <h3 className="font-bold text-2xl text-zinc-300">Add Friend</h3>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="off"
            required
            className="appearance-none focus:outline-none p-1 rounded-md"
            placeholder="User Name"
          />

          <button type="submit" className="bg-violet-600 rounded-md hover:bg-violet-700">Add</button>
        </form>
      </Modal>

    </div>
  )
}