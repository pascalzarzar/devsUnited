import React, { useState, useContext } from "react";
import { auth, googleSignUp, firestore } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import logo from '../../logo.svg'
import googleSign from '../../assets/svg/Google.svg'
import './Login.css';

const Login = () => {

    const [formValue, setFormValue] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    let { setUser } = useContext(AuthContext);

    const handleFormValue = (e) => {
        setFormValue({ ...formValue, [e.target.name]:e.target.value });
    }

    const userLogIn = (e) => {
        e.preventDefault();
        let { email, password } = formValue;
        auth.signInWithEmailAndPassword(email, password)
        .then((userCredentials) => {
            let { uid } = userCredentials.user;
            firestore.collection('users').where('uid', '==', uid)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    setUser({ ...data });
                    navigate('/');
                });
            });
        })
        .catch((err) => {
            console.log(err.message);
        });
    };

    const signUpWithGoogle = () => {
        googleSignUp()
        .then((userCredentials) => {
            console.log(userCredentials);
            let { uid, email, photoURL  } = userCredentials.user;
            firestore.collection('users').where('uid', '==', uid)
            .get()
            .then((querySnapshot) => {
                if(querySnapshot.docs.length === 0){
                    console.log('new user');
                    firestore.collection('users').add({ uid, email, photoURL })
                    .then((data) => {
                        setUser({ id: data.id, uid, email, photoURL})
                        navigate('/register/welcome');
                    })
                } else {
                    querySnapshot.forEach((doc) => {
                        console.log('existing');
                        const {id, uid, email, username, bgColor, photoURL} = doc.data();
                        setUser({ id, uid, email, username, bgColor, photoURL });
                        navigate('/');
                    })
                }
            })
        })
        .catch((err) => {
            console.log(err.message);
        });
    };

    return(
        <div className='Login'>
            <div className='Login-Container'>
                <div className='Login-Logo'>
                    <img src={logo} alt='devs united logo' />
                </div>
                <div className='Login-Inputs'>
                    <h2 className='Login-Inputs-title'>Welcome!</h2>
                    <p className='Login-Inputs-p'>Please enter your username and password to login</p>    
                    <form className='Login-Form' action="" onSubmit={userLogIn}>
                        <input className='Login-Input' type='email' name='email' placeholder='Email' required onChange={handleFormValue} />
                        <input className='Login-Input' type='password' name='password' placeholder='Password' required onChange={handleFormValue} />
                        <input className='Login-Button' type='submit' value='Log In' />
                    </form>
                    <p className='Login-Inputs-p'>or use your gmail account</p>
                    <img className='Login-Inputs-google' src={googleSign} alt='google sign up button' onClick={signUpWithGoogle} />
                    <p className='Login-Inputs-footer'>&#169;2021 Devs_United - <span>BETA</span></p>
                </div>
            </div>
        </div>
    );
}

export default Login;