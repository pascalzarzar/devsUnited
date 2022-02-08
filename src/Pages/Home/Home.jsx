import React, {useState, useContext} from 'react';
import { firestore } from '../../firebaseConfig';
import Tweet from '../../Components/Tweet/Tweet'
import { AuthContext } from '../../Context/AuthContext';
import { Link } from 'react-router-dom';
import baseProfile from '../../assets/svg/profile.svg';
import NavBar from '../../Components/NavBar/NavBar';
import './Home.css'


const Home = () => {

    const [tweetFormValue, setTweetFormValue] = useState({ message: ''});
    const {user, tweets} = useContext(AuthContext);

    const handleTweetForm = (e) => {
        setTweetFormValue({ ...tweetFormValue, [e.target.name]: e.target.value });
    };
    
    const createTweet = (e) => {
        e.preventDefault();
        const {username, bgColor, uid, photoURL } = user;
        firestore.collection('tweets')
        .add({ ...tweetFormValue, uid: uid, username, bgColor, likes: [], photoURL })
        .then(() => {
            setTweetFormValue({ message:'' })
        })
        .catch((err) => {
            console.log(err.message);
        });
    }

    return(
        <main className="Home">
            <NavBar home={true}/>
            <div className='Home-Form'>
                <div className='Home-Form-ProfileImg'>
                    <img src={user.photoURL ? user.photoURL : baseProfile} alt="profile" />
                </div>
                <form onSubmit={createTweet} className='Home-Form-Inputs'>
                    <textarea 
                        name="message" 
                        cols="30" 
                        rows="10"  
                        placeholder='Whats Happening?'
                        className='Home-Form-Textarea' 
                        onChange={handleTweetForm}
                        value={tweetFormValue.message}>    
                        </textarea>
                    <input type="submit" value='POST' className='Home-Form-Button' />
                </form>
            </div>
            <div className='Home-Tweets'>
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
        </main>
    );
}

export default Home;