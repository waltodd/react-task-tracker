import Button from "./Button"
const onClick = () => {
  console.log('clicked')
}
const Header = ({title}) => {
  return (
    <header className="header">
        <h1>{title}</h1>
      <Button onClick={onClick} color='#1c2021' text={'Add'} />
    </header>
  )
}

Header.defaultProps = {
    title: 'Task Tracker'
}

export default Header