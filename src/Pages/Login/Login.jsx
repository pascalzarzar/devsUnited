import React, { useState, useContext } from "react";
import { auth, googleSignUp } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const Login = () => {

    const [formValue, setFormValue] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    let setUser = useContext(AuthContext);

    const handleFormValue = (e) => {
        setFormValue({ ...formValue, [e.target.name]:e.target.value });
    }

    const userLogIn = (e) => {
        e.preventDefault();
        let { email, password } = formValue;
        auth.signInWithEmailAndPassword(email, password)
        .then((userCredentials) => {
            let {uid, email} = userCredentials.user;
            setUser({ uid, email });
            navigate('/');
        })
        .catch((err) => {
            console.log(err.message);
        });
    };

    const signUpWithGoogle = () => {
        googleSignUp()
        .then((userCredentials) => {
            let {uid, email} = userCredentials.user;
            setUser({ uid, email });
            navigate('/');
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