import { useState } from "react";
import { Link } from "react-router-dom";

export default function Form({ items, onSubmit }) {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const parser = (item) => {
    if( item.type === "text" || item.type === "email" || item.type === "password" ) {
      return (
        <div key={item.id}>
          <input
            id={item.id}
            name={item.id}
            type={item.type}
            autoComplete={item.type === "email" ? "email" : "off"}
            required={!!item.required}
            className={`appearance-none focus:outline-none p-1 rounded-md box-border text-black ${error ? 'bg-red-300' : ''} ${success ? ' bg-green-200' : ''}`}
            placeholder={item.placeholder}
          />
        </div>
      )
    } else if ( item.type === "file" ) {
      return (
        <div key={item.id}>
          <label for={item.id} className="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
            </svg>
            file
          </label>
          <input type={item.type} id={item.id} name={item.id} className="hidden">

          </input>
        </div>
      )
    } else if( item.type === "submitButton" ) {
      return (
        <button key='submitButton' type="submit" className="text-slate-50 px-2 py-1 bg-violet-800 rounded-md hover:bg-violet-900">{item.content}</button>
      )
    } else if( item.type === "closeButton" ) {
      return (
        <div key='closeButton' className="flex items-start w-full">
          <button className="text-slate-50" onClick={item.onClick}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

      )
    } else if( item.type === "logo" ) {
      return ( 
        <div className="" key="logo">
          <Link to='/'>
            <img className="w-14 h-14" src="logo.svg" alt="Logo"/>
          </Link>
        </div>
      )
    }
  }

  return (
    <form onSubmit={async (e) => {
      const success = await onSubmit(e);
      setSuccess(success);
      setError(!success);
      }} 
      className="flex flex-col items-center gap-4 w-full"
      >

      {
        items ? items.map(parser) : null
      }
    </form>
  )
}