import "../style/Hamburger.css"

export default function Hamburger(props) {

  const active = props.shown

  return (
    <div className={`Hamburger ${ active ? "active" : "" } ${ props.left ? "left" : "right" }`} onClick={() => {props.onClick()}}>
      <div className={`HamburgerLine ${ active ? "active" : "" }`}/>
    </div>
  )
}