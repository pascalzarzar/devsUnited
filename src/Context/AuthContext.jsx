import React, { createContext, useState, useEffect } from "react";
import { firestore, auth } from "../firebaseConfig";
import { logout } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    
    const [user, setUser] = useState({});
    const [tweets, setTweets] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const desuscribir = firestore.collection('tweets')
            .onSnapshot((snapshot) => {
                const tweets = snapshot.docs.map((doc) => {
                    return {
                        uid: doc.data().uid,
                        username: doc.data().username,
                        message: doc.data().message,
                        bgColor: doc.data().bgColor,
                        likes: doc.data().likes,
                        photoURL: doc.data().photoURL,
                        id: doc.id
                    };
                });
                setTweets(tweets);
            });
            auth.onAuthStateChanged((user) => {
                if(user !== null){
                    firestore.collection('users').where('uid', '==', user.uid)
                    .get()
                    .then((querySnapshot) => {
                        setUser(querySnapshot.docs[0].data());
                    })
                    .catch((err) => {
                        console.log(err.message);
                    })
                } else {
                    setUser(user);
                }
            });
            return () => desuscribir();
    },[setUser]);

    const userLogOut = () => {
        navigate('/login');
        logout();
    }


    return(
        <AuthContext.Provider value={{ user, setUser, tweets, setTweets, userLogOut }}>
            {children}
        </AuthContext.Provider>
    ); 
}

export default AuthProvider;