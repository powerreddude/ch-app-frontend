import postUser from "../api/icons/postUser";
import CenterIsland from "../components/CenterIsland";
import Modal from "../components/Modal";
import Form from "../components/Form"
import { useState } from "react";

export default function UserSettings({ user }) {
  const [iconModal, setIconModal] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    const file = e.target.icon.files[0];
    console.log(file)

    await postUser({ file });
  }

  return (
    <CenterIsland className="bg-zinc-700">

      <h1 className="text-3xl text-left ml-4">Account</h1>
      <div className="rounded-lg border-2 shadow-lg flex gap-4 border-zinc-600 p-4 m-4">
        <div className="">
          <div className="flex gap-2 items-center">
            <h1 className="text-2xl text-left">{user.name}</h1>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
          </div>
          <div className="flex items-center">
            {/* icon */}
            <div className="rounded-full w-40 h-40 bg-black">
              <div className="w-full h-full opacity-0 rounded-full flex justify-center items-center hover:opacity-50 transition-opacity" onClick={() => setIconModal(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3/4 h-3/4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
              </div>
            </div>

          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="text-left">
            <h1 className="text-2xl text-left">Email</h1>
            *************@foo.com
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
          </div>
          <div className="text-left">
            <h1 className="text-2xl text-left">Password</h1>
            *******
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
          </div>
        </div>
        <div className="text-left grow">
          <h1 className="text-2xl text-left">Bio</h1>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean porta sapien justo, sed molestie velit dignissim sollicitudin. Vivamus quis nunc ac urna iaculis ornare. Curabitur vel eros libero. Aenean convallis tempor molestie. Vestibulum urna arcu, cursus sed condimentum quis, vulputate a justo. Proin scelerisque pretium finibus. Donec ac arcu luctus, convallis tortor at, posuere velit. Pellentesque odio nisi, ultricies at rutrum eget, semper vel ante. Fusce dui sem, auctor non finibus tempus, fermentum id ligula. Nam convallis, felis nec condimentum convallis, turpis lorem blandit neque, eu lobortis odio nulla id magna. Nulla facilisis arcu posuere dolor pharetra, quis faucibus nunc tristique. Nulla lacinia bibendum lectus, scelerisque dapibus tortor tempus eu. In suscipit varius sagittis. Integer congue magna tortor, sed pulvinar quam luctus sagittis. 
        </div>
      </div>

      <Modal open={iconModal}>
        <Form 
          onSubmit={onSubmit}
          items={[
            {
              type: 'closeButton',
              onClick: () => {
                setIconModal(false);
              }
            },
            {
              type: 'file',
              id: 'icon'
            },
            {
              type: 'submitButton',
              content: 'Upload'
            }
          ]}
        />
      </Modal>
    </CenterIsland>
    
  )
}