import React, { useState } from "react";
import { firestore } from "../../firebaseConfig";
import logo from '../../logo.svg';
import './Welcome.css';

const Welcome = () => {



    return(
        <div className="Welcome">
            <img src={logo} alt="logo" />
            <form action="">
                <label htmlFor="username">WELCOME <span>NAME!</span></label>
                <input type="text" name="username" id="username" placeholder="username" />
                <label htmlFor="color"></label>
                <div className="color-radio">
                    <label htmlFor="color1" className="radio_label">
                        <img src={logo} alt="" />
                    </label>
                    <input type="radio" className="radio_input" name="color" id="color1" value='#F50D5A' />
                    <label htmlFor="color2" className="radio_label">#FF865C</label>
                    <input type="radio" className="radio_input" name="color" id="color2" value='#FF865C' />
                    <label htmlFor="color3" className="radio_label">#FFEA5C</label>
                    <input type="radio" className="radio_input" name="color" id="color3" value='#FFEA5C' />
                    <label htmlFor="color4" className="radio_label">#00DA76</label>
                    <input type="radio" className="radio_input" name="color" id="color4" value='#00DA76' />
                    <label htmlFor="color5" className="radio_label">#00DA76</label>
                    <input type="radio" className="radio_input" name="color" id="color5" value='#00DA76' />
                    <label htmlFor="color6" className="radio_label">#800FFF</label>
                    <input type="radio" className="radio_input" name="color" id="color6" value='#800FFF' />
                </div>
                <input type="submit" value="continue" />
            </form>    
        </div>
    )
}

export default Welcome;