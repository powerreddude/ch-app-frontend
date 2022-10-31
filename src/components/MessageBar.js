export default function MessageBar({ onSubmit }) {
  return (
    <div className="w-full">
      <form onSubmit={onSubmit} className="w-full flex">
        <input
          id="message"
          name="message"
          type="text"
          autoComplete="off"
          className="appearance-none focus:outline-none p-1 rounded-md mx-2 grow mb-2"
          placeholder="Message"
        ></input>
      </form>
    </div>
  )
}