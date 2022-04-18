import Button from "./Button"
import { useLocation } from "react-router-dom"
const Header = ({title, onAdd, showAdd}) => {
  const location = useLocation()
  return (
    <header className="header">
      <h1>{title}</h1>
      { location.pathname ==='/' && (
        <Button onClick={onAdd} color={ showAdd ? 'red' :'#1c2021'} text={showAdd ? 'Close' :'Add'} />
      )}
      
    </header>
  )
}

Header.defaultProps = {
    title: 'Task Tracker'
}

export default Header