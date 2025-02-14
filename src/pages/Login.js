import { Link, Navigate } from "react-router-dom";
import Form from "../components/Form";

export default function Login({ authed, onSubmit }) {
  if (authed) {
    return <Navigate to={'/'} replace/>;
  }

  return (
    <div className="flex flex-col justify-center h-full w-full">
      <div className='flex flex-col p-4 mx-auto rounded-md bg-zinc-700 shadow-lg'>
        <Form 
          onSubmit={onSubmit}
          items={[
            {
              type: 'logo'
            },
            {
              type: 'email',
              id: 'email',
              placeholder: 'Email'
            },
            {
              type: 'password',
              id: 'password',
              placeholder: "Password"
            },
            {
              type: 'submitButton',
              content: 'Login'
            }
          ]}
          />
      </div>
    </div>
  )
}