import React, { useState, useContext } from "react";
import { firestore } from "../../firebaseConfig";
import logo from '../../logo.svg';
import ColorInput from '../../Components/ColorInput/ColorInput';
import { AuthContext } from "../../Context/AuthContext";
import './Welcome.css';


const Welcome = () => {

    const [formValue, setFormValue] = useState({username: '', bgColor: ''});

    const { user, setUser, navigate } = useContext(AuthContext);

    const handleChange = (e) => {
        setFormValue({...formValue, [e.target.name]: e.target.value });
    }

    const createUserSettings = (e) => {
        e.preventDefault();
        const { username, bgColor } = formValue;
        firestore.collection('users').doc(user.id).update({ ...user, username, bgColor })
        .then(() => {
            firestore.collection('users').doc(user.id).get()
            .then((doc) => {
                setUser({ ...doc.data() });
                navigate('/Home');
            })
        })
        .catch((err) => {
            console.log(err.message);
        });
    }

    return(
        <div className='Welcome'>
            <div className='Welcome-Container'>
                <div className='Welcome-Logo'>
                    <img src={logo} alt='logo' />
                </div>
                <div className='Welcome-Inputs'>
                    <form action="" onSubmit={createUserSettings}>
                        <h2 className='Welcome-Inputs-Title'>Welcome</h2>
                        <h2 className='Welcome-Inputs-Title colored'>Name!</h2>
                        <input type="text" name="username" id="username" placeholder="Type your username" onChange={handleChange} required/>
                        <p className='Welcome-Inputs-p'>Select your favorite color</p>
                        <label htmlFor="color"></label>
                        <div className="Welcome-Inputs-Color" required>
                            <input type="radio" className="radio_input" name="bgColor" id="color1" value='#F50D5A' onChange={handleChange} />
                            <label htmlFor="color1" className="radio_label">
                                <ColorInput color={'#f50d5a'}/>
                            </label>
                            <input type="radio" className="radio_input" name="bgColor" id="color2" value='#FF865C' onChange={handleChange} />
                            <label htmlFor="color2" className="radio_label">
                                <ColorInput color={'#FF865C'}/>
                            </label>
                            <input type="radio" className="radio_input" name="bgColor" id="color3" value='#FFEA5C' onChange={handleChange} />
                            <label htmlFor="color3" className="radio_label">
                                <ColorInput color={'#FFEA5C'}/>
                            </label>
                            <input type="radio" className="radio_input" name="bgColor" id="color4" value='#00DA76' onChange={handleChange} />
                            <label htmlFor="color4" className="radio_label">
                                <ColorInput color={'#00DA76'}/>
                            </label>
                            <input type="radio" className="radio_input" name="bgColor" id="color5" value='#00DA76' onChange={handleChange} />
                            <label htmlFor="color5" className="radio_label">
                                <ColorInput color={'#00DA76'}/>    
                            </label>
                            <input type="radio" className="radio_input" name="bgColor" id="color6" value='#800FFF' onChange={handleChange} />
                            <label htmlFor="color6" className="radio_label">
                                <ColorInput color={'#800FFF'}/>    
                            </label>
                        </div>
                        <input type="submit" value="continue" />
                        <p className='Welcome-Inputs-Footer'>&#169;2021 Devs_United - <span>BETA</span></p>
                    </form>    
                </div>
            </div>
        </div>
    )
}

export default Welcome;