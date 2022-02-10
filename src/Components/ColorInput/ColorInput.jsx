import './ColorInput.css'

const ColorInput = (props) => {
    
    return(
        <div className='colorInput' style={{backgroundColor: `${props.color}`}}></div>
    )
}

export default ColorInput;

