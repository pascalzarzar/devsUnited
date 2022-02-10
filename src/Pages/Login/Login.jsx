import React, { useContext } from "react";
import { googleSignUp, firestore } from "../../firebaseConfig";
import { AuthContext } from "../../Context/AuthContext";
import logo from '../../logo.svg'
import googleSign from '../../assets/svg/Google.svg'
import './Login.css';

const Login = () => {

    let { setUser, navigate} = useContext(AuthContext);

    const signUpWithGoogle = () => {
        googleSignUp()
        .then((userCredentials) => {
            let { uid, email, photoURL  } = userCredentials.user;
            firestore.collection('users').where('uid', '==', uid)
            .get()
            .then((querySnapshot) => {
                if(querySnapshot.docs.length === 0){
                    firestore.collection('users').add({ uid, email, photoURL })
                    .then((data) => {
                        setUser({ id: data.id, uid, email, photoURL})
                        navigate('/welcome');
                    })
                } else {
                    querySnapshot.forEach((doc) => {
                        const {id, uid, email, username, bgColor, photoURL} = doc.data();
                        setUser({ id, uid, email, username, bgColor, photoURL });
                        navigate('/Home');
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
                    <p className='Login-Inputs-p'>Sign in with your gmail account</p>
                    <img className='Login-Inputs-google' src={googleSign} alt='google sign up button' onClick={signUpWithGoogle} />
                    <p className='Login-Inputs-footer'>&#169;2021 Devs_United - <span>BETA</span></p>
                </div>
            </div>
        </div>
    );
}

export default Login;