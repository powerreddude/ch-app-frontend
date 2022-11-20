import postUser from "../api/icons/postUser";
import Form from "../components/Form"

export default function UserSettings({  }) {
  const onSubmit = async (e) => {
    e.preventDefault();
    const file = e.target.icon.files[0];
    console.log(file)

    await postUser({ file });
  }

  return (
    <div className="w-full h-full">
      <div className="flex flex-col justify-center h-full w-full">
        <div className='flex flex-col p-4 px-20 text-slate-50 mx-auto rounded-md bg-zinc-700 shadow-lg'>
          <Form 
          onSubmit={onSubmit}
          items={[
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
        </div>
      </div>
    </div>
  )
}