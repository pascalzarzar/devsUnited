import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from '../../Context/AuthContext';
import { firestore } from "../../firebaseConfig";
import Tweet from '../../Components/Tweet/Tweet'
import logo from '../../logo.svg'

const Profile = () => {

    const [isFavorites, setIsFavorites] = useState(true);
    const [tweets, setTweets] = useState({});
    const { user } = useContext(AuthContext);

    const handleRadio = (e) => {
        setIsFavorites(e.target.value);
    }
    

    const showPosts = () => {
        firestore.collection('tweets').where('uid', '==', user.uid)
        .onSnapshot((snapshot) => {
            const tweets = snapshot.docs.map((doc) => {
                return {
                    uid: doc.data().uid,
                    username: doc.data().username,
                    message: doc.data().message,
                    bgColor: doc.data().bgColor,
                    likes: doc.data().likes,
                    id: doc.id
                }
            });
        setTweets(tweets);
        });

    };

    const showFavorites = () => {
        firestore.collection('users').where('uid', '==', user.uid)
        .onSnapshot((snapshot) => {
            const tweets = snapshot.docs.map((doc => {
                return doc.data().favorites;
            }));
            setTweets(tweets[0]);
        });
    };

    useEffect(() => {
        if (isFavorites === true){
            showFavorites();
        } else {
            console.log('posts');
            showPosts();
        }
    }, [isFavorites]);

    return(
        <div>
            <div>
                <img src={logo} alt="user profile" />
            </div>
            <div className="radioMenu">
                <input type="radio" name="type" id="posts" value={false} onChange={handleRadio}  />
                <label htmlFor="posts">Posts</label>
                <input type="radio" name="type" id="favorites" value={true} onChange={handleRadio} />
                <label htmlFor="favorites">Favorites</label>
            </div>
            {tweets.length >= 0
            ? tweets.map((tweet) => {
                return(
                    <Tweet 
                    key={tweet.id}
                    data={tweet}
                    /> 
                ) 
                })
            : <p>Loading here</p>
            }
        </div>
    )
}

export default Profile;