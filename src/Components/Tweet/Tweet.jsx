import React, { useContext, useState, useEffect, useRef } from "react";
import firebase, { firestore } from "../../firebaseConfig";
import { AuthContext } from "../../Context/AuthContext";

const Tweet = (props) => {

    const { user } = useContext(AuthContext);
    const [isFavorite, setisFavorite] = useState(false);

    const {id, uid, message, username, likes} = props.data;

    const addToFavorites =  () => {
        if(user !== null) {
            firestore.collection('tweets').doc(id).update({
                likes: firebase.firestore.FieldValue.arrayUnion(user.uid)
            })
            firestore.collection('users').doc(user.id).update({
                favorites: firebase.firestore.FieldValue.arrayUnion(props.data)
            })
            .catch((err) => {
                console.log(err.message);
            })
        }
    }

    const eraseFromFavorites = () => {
        if(user !== null) {
            firestore.collection('tweets').doc(id).update({
                likes: firebase.firestore.FieldValue.arrayRemove(user.uid)
            })
            firestore.collection('users').doc(user.id).update({
                favorites: firebase.firestore.FieldValue.arrayRemove(props.data)
            })
            .catch((err) => {
                console.log(err.message);
            })
        }
    }

    const firstRendering = useRef(true);

    useEffect(()=> {
        if(firstRendering.current && user != null){
            const findFavorite = likes.findIndex((id) => {
                return id === user.uid;
            });
            if(findFavorite >= 0) {
                setisFavorite(true);
            }
            firstRendering.current = false;
        } else {
            if(isFavorite){
                addToFavorites();
            } else {
                eraseFromFavorites();
            }
        }
    },[isFavorite]);

    return(
        <div className="Tweet">
            <p>{message}</p>
            <p>{username}</p>
            {user !== null && user.uid === uid  && <button onClick={props.delete}>Eliminar Tweet</button>}
            {user !== null && <input type="checkbox" name="like" id="like" onChange={() => setisFavorite(!isFavorite)} checked={isFavorite} /> }
            <label id="like">{likes.length || 0}</label>
        </div>
    );
};

export default Tweet;