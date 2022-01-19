import React, { useState, useContext} from "react";
import { auth, firestore } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const Register = () => {

    const [formValue, setFormValue] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    const handleChange = (e) => {
        setFormValue({ ...formValue,[e.target.name] : e.target.value });
    }

    const createUser = (e) => {
        e.preventDefault();
        let {email, password} = formValue;
        auth.createUserWithEmailAndPassword(email,password)
        .then((userCredentials) => {
            let {uid, email} = userCredentials.user;
            firestore.collection('users').add({ uid: uid, email: email })
            .then((data) => {
                setUser({ id: data.id,uid, email });
                navigate('/register/welcome');
            });
        })
        .catch((err) => {
            console.log(err.message);
        });
    }

    return(
        <div className="Register">
            <form onSubmit={createUser}>
                <input type="email" placeholder="Email" name='email' onChange={handleChange} required />
                <input type="password" placeholder="Password" name='password' onChange={handleChange} required />
                <input type="submit" />
            </form>
        </div>
    )
}

export default Register;