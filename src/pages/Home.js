import { useEffect, useState } from 'react';
import postFriendship from '../api/friendships/postFriendship';
import Channel from '../components/Channel';
import Modal from '../components/Modal';
import SideBar from '../components/SideBar';
import Loading from './Loading';
import { Link } from 'react-router-dom';
import getUsername from '../api/users/getUsername';
import getFriendships from '../api/friendships/getFriendships';
import Form from '../components/Form';

export default function Home({ socket }) {
  const [activeChannel, setActiveChannel] = useState(null);
  const [friendships, setFriendships] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [openAddFriendModal, setOpenAddFriendModal] = useState(false);
  const [openFriendModal, setOpenFriendModal] = useState(false);

  useEffect(() => {

    getFriendships().then(friendships => {
      setFriendships(friendships);
      setLoaded(true)
    })

    socket.on(`user-friendships-channel-create`, (msg) => { 
      const parsed = JSON.parse(msg);

      console.log(parsed)

      setFriendships(friendships => !friendships.find(friendships => friendships.channel.id === parsed.channel.id) ? [...friendships, parsed] : friendships);
    })
  }, [])

  const onAddFriend = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    var user;

    try {
      user = await getUsername({ name: name });
    } catch {

    }

    if(user) {
      try {
        await postFriendship({ addresseeId: user.id });
      } catch {
        return false;
      }

      return true;
    } else {
      return false;
    }
  }

  if(!loaded) {return (<Loading></Loading>)}

  return (
    <div className="flex h-full">
      <SideBar left stickyBottom={
        <div className="flex mb-2 ml-1 overflow-hidden w-full items-center rounded-l-md shadow-xl bg-zinc-700 px-1">
          {/* <div className="cursor-pointer" onClick={() => {setOpenFriendModal(true)}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
          </div> */}
          <div className="cursor-pointer" onClick={() => {setOpenAddFriendModal(true)}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
            </svg>
          </div>
        </div>
      }
      stickyBottomBar={
        <div className="flex mb-2 mr-1 overflow-hidden justify-between w-full items-center rounded-r-md shadow-xl bg-zinc-700 px-1">
          
        </div>
      }
      >
        <div className='w-full'>
          {
            friendships.map(friendship => {
              return (
                <div key={friendship.channel.id} className={`${activeChannel && friendship.channel.id === activeChannel.id ? "drop-shadow-md text-zinc-50 bg-zinc-700" : "text-zinc-400"} flex items-center text-left text-ellipsis overflow-hidden m-1 p-1 rounded-xl cursor-pointer`} onClick={() => {setActiveChannel(friendship.channel)}}>
                  <div className="w-12 h-12 mx-2 shrink-0">
                  {friendship.addressee && friendship.addressee.icon ? <img className="rounded-full object-cover w-full h-full" src={`/api/icons/user?filename=${friendship.addressee.icon}`}></img> : ''}
                  </div>
                  <abbr title={friendship.channel.name} className="border-b-0 no-underline pb-2.5 pt-1.5">{friendship.channel.name}</abbr>
                </div>
              )
            })
          }
        </div>
      </SideBar>
      {
        activeChannel ?
        <Channel key={activeChannel.id} channel={activeChannel} socket={socket}/>
        :
        <div className='grow h-full bg-zinc-700'></div>
      }
      {/* add friend modal */}
      <Modal open={openAddFriendModal}>
        <Form items={
          [
            {
              type: 'closeButton',
              onClick: () => {
                setOpenAddFriendModal(false);
              }
            },
            {
              type: 'text',
              id: 'name',
              placeholder: 'Name'
            },
            {
              type: 'submitButton',
              content: 'Add Friend'
            }
          ]
        }
        onSubmit={onAddFriend}
        />
      </Modal>

      {/* view friends modal */}
      {/* <Modal open={openFriendModal}>
        <div key='closeButton' className="flex items-start w-full">
          <button className="text-slate-50" onClick={() => {setOpenFriendModal(false)}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className='w-80'>
        {
            friendships.map(friendship => {
              return (
                <div key={friendship.channel.id} className={`${activeChannel && friendship.channel.id === activeChannel.id ? "drop-shadow-md text-zinc-50 bg-zinc-700" : "text-zinc-400"} flex items-center text-left text-ellipsis overflow-hidden m-1 p-1 rounded-xl cursor-pointer`} onClick={() => {setActiveChannel(friendship.channel)}}>
                  <div className="w-12 h-12 mx-2 shrink-0">
                  {friendship.addressee && friendship.addressee.icon ? <img className="rounded-full object-cover w-full h-full" src={`/api/icons/user?filename=${friendship.addressee.icon}`}></img> : ''}
                  </div>
                  <abbr title={friendship.channel.name} className="border-b-0 no-underline pb-2.5 pt-1.5">{friendship.channel.name}</abbr>
                </div>
              )
            })
          }
        </div>
      </Modal> */}
    </div>
  )
}