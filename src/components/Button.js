const Button = ({color, text, onClick}) => {
    return (
        <div>
            <button onClick={onClick} style={{backgroundColor: color}} className="btn">{text}</button>
        </div>
    )
}

export default  Button;