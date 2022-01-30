import React, { useState, useContext } from "react";
import { auth, googleSignUp, firestore } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

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
            let { uid, email } = userCredentials.user;
            firestore.collection('users').where('uid', '==', uid)
            .get()
            .then((querySnapshot) => {
                if(querySnapshot.docs.length === 0){
                    console.log('new user');
                    firestore.collection('users').add({ uid, email, favorites: {} })
                    .then((data) => {
                        setUser({ id: data.id, uid, email})
                        navigate('/register/welcome');
                    })
                } else {
                    querySnapshot.forEach((doc) => {
                        console.log('existing');
                        const {id, uid, email, username, bgColor} = doc.data();
                        setUser({ id, uid, email, username, bgColor });
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
        <div>
            <form action="" onSubmit={userLogIn}>
                <input type="email" name="email" placeholder="Email" required onChange={handleFormValue} />
                <input type="password" name="password" placeholder="Password" required onChange={handleFormValue} />
                <input type="submit" value="Log In" />
            </form>
            <h3>O inicia sesión con tu cuenta de gmail</h3>
            <button onClick={signUpWithGoogle}>Log In with Google</button>
        </div>
    );
}

export default Login;