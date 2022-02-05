import React, { useContext, useState, useEffect, useRef } from "react";
import firebase, { firestore } from "../../firebaseConfig";
import { AuthContext } from "../../Context/AuthContext";
import likeSvg from '../../assets/svg/like.svg'
import dislikeSvg from '../../assets/svg/dislike.svg'

const Tweet = (props) => {

    const { user } = useContext(AuthContext);
    const {id, uid, message, username, likes} = props.data;

    const addToFavorites =  () => {
        if(user !== null) {
            firestore.collection('tweets').doc(id).update({
                likes: firebase.firestore.FieldValue.arrayUnion(user.uid)
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
            .catch((err) => {
                console.log(err.message);
            })
        }
    }

    const deleteTweet = (id) => {
        firestore.collection('tweets').doc(id).delete()
        .catch((err) => {
            console.log(err.message);
        });
    }


    const showLike = (likes) => {
        if(likes.length >= 0 && user.uid) {
            let isLikedByUser = likes.findIndex((like) => like === user.uid);
            if (isLikedByUser >= 0){
                return(
                    <div>
                        <img src={likeSvg} alt="hearth svg for likes" onClick={() => eraseFromFavorites()} />
                    </div>
                )
            }
            else {
                return(
                    <div>
                        <img src={dislikeSvg} alt="heath svg for idle state on likes" onClick={() => addToFavorites()} />
                    </div>
                )
            } 
        }
    }

    return(
        <div className="Tweet">
            <p>{message}</p>
            <p>{username}</p>
            {user !== null && user.uid === uid  && <button onClick={() => deleteTweet(id)}>Eliminar Tweet</button>}
            {user !== null && showLike(likes)}
            <label id="like">{likes.length || 0}</label>
        </div>
    );
};

export default Tweet;