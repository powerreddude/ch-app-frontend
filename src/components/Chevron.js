import "../style/Chevron.css"

export default function Chevron(props) {

  const active = props.shown

  return (
    <div className={`Chevron m-1 hover:rounded-full hover:bg-zinc-700 ${ active ? "active" : "" } ${ props.left ? "left" : "right" }`} onClick={() => {props.onClick()}}>
      <div className={`ChevronLine ${ active ? "active" : "" }`}/>
    </div>
  )
}