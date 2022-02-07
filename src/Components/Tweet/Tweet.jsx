import React, { useContext } from "react";
import firebase, { firestore } from "../../firebaseConfig";
import { AuthContext } from "../../Context/AuthContext";
import likeSvg from '../../assets/svg/like.svg';
import dislikeSvg from '../../assets/svg/dislike.svg';
import baseProfile from '../../assets/svg/profile.svg';
import './Tweet.css';



const Tweet = (props) => {

    const { user } = useContext(AuthContext);
    const {id, uid, message, username, likes, photoURL, bgColor } = props.data;

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
                        <img className="Tweet-Content-Like-Icon" src={likeSvg} alt="hearth svg for likes" onClick={() => eraseFromFavorites()} />
                    </div>
                )
            }
            else {
                return(
                    <div>
                        <img className="Tweet-Content-Like-Icon" src={dislikeSvg} alt="heath svg for idle state on likes" onClick={() => addToFavorites()} />
                    </div>
                )
            } 
        }
    }

    return(
        <div className="Tweet">
            <div className="Tweet-Img">
                <img src={photoURL ? photoURL : baseProfile} alt="author" />
            </div>
            <div className="Tweet-Content">
                <div className="Tweet-Content-Header">
                    <h5 className='Tweet-Content-Username' style={{backgroundColor: bgColor}}>{username}</h5>
                    {user !== null && user.uid === uid  && <i className="far fa-trash-alt Tweet-Content-Delete" onClick={() => deleteTweet(id)}></i>}
                </div>
                <p className='Tweet-Content-Message'>{message}</p>
                <div className="Tweet-Content-Like">
                    {user !== null && showLike(likes)}
                    <label id="like" className="Tweet-Content-Like-Count">{likes.length}</label>
                </div>
            </div>
        </div>
    );
};

export default Tweet;