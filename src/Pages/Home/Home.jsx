import React, {useState, useEffect, useContext} from 'react';
import { firestore, logout, auth } from '../../firebaseConfig';
import Tweet from '../../Components/Tweet/Tweet'
import { AuthContext } from '../../Context/AuthContext';
import { Link } from 'react-router-dom';
import FavTweets from '../../Components/FavTweets/FavTweets';


const Home = () => {

    const [tweetFormValue, setTweetFormValue] = useState({ message: ''});
    const {user, tweets} = useContext(AuthContext);

    const handleTweetForm = (e) => {
        setTweetFormValue({ ...tweetFormValue, [e.target.name]: e.target.value });
    };

    console.log(user);
    
    const createTweet = (e) => {
        e.preventDefault();
        const {username, bgColor, uid } = user;
        firestore.collection('tweets')
        .add({ ...tweetFormValue, uid: uid, username, bgColor, likes: {}  })
        .then(() => {
            setTweetFormValue({ message:'' })
        })
        .catch((err) => {
            console.log(err.message);
        });
    }


    return(
        <main className="Home">
            <button onClick={logout}>Log out</button>
            <button>
                <Link to='/profile'>Profile</Link>
            </button>
            <form onSubmit={createTweet}>
                <textarea 
                    name="message" 
                    cols="30" 
                    rows="10"  
                    placeholder='Whats Happening?' 
                    onChange={handleTweetForm}
                    value={tweetFormValue.message}>    
                    </textarea>
                <input type="submit" />
            </form>
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
            <FavTweets/>
        </main>
    );
}

export default Home;