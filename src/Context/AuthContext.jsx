import React, { createContext, useState, useEffect } from "react";
import { firestore, auth } from "../firebaseConfig";

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    
    const [user, setUser] = useState({});
    const [tweets, setTweets] = useState({});

    useEffect(() => {
        const desuscribir = firestore.collection('tweets')
            .onSnapshot((snapshot) => {
                const tweets = snapshot.docs.map((doc) => {
                    return {
                        uid: doc.data().uid,
                        username: doc.data().username,
                        message: doc.data().message,
                        bgColor: doc.data().bgColor,
                        likes: doc.data().likes || {},
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

    return(
        <AuthContext.Provider value={{ user, setUser, tweets, setTweets }}>
            {children}
        </AuthContext.Provider>
    ); 
}

export default AuthProvider;