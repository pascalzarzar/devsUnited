import React, {useState, useContext} from 'react';
import { firestore } from '../../firebaseConfig';
import Tweet from '../../Components/Tweet/Tweet'
import { AuthContext } from '../../Context/AuthContext';
import { Link } from 'react-router-dom';
import baseProfile from '../../assets/svg/profile.svg';


const Home = () => {

    const [tweetFormValue, setTweetFormValue] = useState({ message: ''});
    const {user, tweets, userLogOut} = useContext(AuthContext);

    const handleTweetForm = (e) => {
        setTweetFormValue({ ...tweetFormValue, [e.target.name]: e.target.value });
    };
    
    const createTweet = (e) => {
        e.preventDefault();
        const {username, bgColor, uid } = user;
        firestore.collection('tweets')
        .add({ ...tweetFormValue, uid: uid, username, bgColor, likes: []  })
        .then(() => {
            setTweetFormValue({ message:'' })
        })
        .catch((err) => {
            console.log(err.message);
        });
    }

    return(
        <main className="Home">
            <button onClick={userLogOut}>Log out</button>
            <button>
                <Link to='/profile'>Profile</Link>
            </button>
            <img src={user.photoURL ? user.photoURL : baseProfile} alt="profile" />
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
        </main>
    );
}

export default Home;