import React, { useState} from "react";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const [formValue, setFormValue] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormValue({ ...formValue,[e.target.name] : e.target.value });
    }

    const createUser = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(formValue.email, formValue.password)
        .then(() => {
            navigate('/');
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