import React, { useState } from "react";
import './ColorInput.css'

const ColorInput = (props) => {

    const [ isClicked, setIsClicked ] = useState('')

    const handleClick = () => {
        if (isClicked === ''){
            setIsClicked('selected');
        } else {
            setIsClicked('');
        }
    }
    
    

    return(
        <div onClick={handleClick} className={`colorInput ${isClicked}`} style={{backgroundColor: `${props.color}`}}></div>
    )
}

export default ColorInput;

