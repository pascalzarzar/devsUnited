import React, {useState, useEffect, useContext} from 'react';
import { firestore, logout, auth } from '../../firebaseConfig';
import Tweet from '../../Components/Tweet/Tweet'
import { AuthContext } from '../../Context/AuthContext';


const Home = () => {

    const [tweets, setTweets] = useState({});
    const [tweetFormValue, setTweetFormValue] = useState({ tweet: ''});
    const {user, setUser} = useContext(AuthContext);

    const handleTweetForm = (e) => {
        setTweetFormValue({ ...tweetFormValue, [e.target.name]: e.target.value });
    };

    const createTweet = (e) => {
        e.preventDefault();
        firestore.collection('tweets')
        .add({ ...tweetFormValue, uid: user.uid, user: user.displayName })
        .then(() => {
            setTweetFormValue({ tweet:'' });
        })
        .catch((err) => {
            console.log(err.message);
        });
    }

    const deleteTweet = (id) => {
        firestore.collection('tweets').doc(id).delete()
        .then(() => {
            console.log('Document successfully deleted');
        })
        .catch((err) => {
            console.log(err.message);
        });
    }

//useEffect hook to get the initial set of tweets
    useEffect(() => {
        const desuscribir = firestore.collection('tweets')
            .onSnapshot((snapshot) => {
                const tweets = snapshot.docs.map((doc) => {
                    return {
                        user: doc.data().user,
                        message: doc.data().tweet,
                        id: doc.id,
                        uid: doc.data().uid 
                    };
                });
                setTweets(tweets);
            });
            auth.onAuthStateChanged((user) => {
                setUser(user);
                console.log(user);
            });
            return () => desuscribir();
    },[]);


    return(
        <main className="Home">
            <button onClick={logout}>Log out</button>
            <form onSubmit={createTweet}>
                <textarea 
                    name="tweet" 
                    cols="30" 
                    rows="10"  
                    placeholder='Whats Happening?' 
                    onChange={handleTweetForm}
                    value={tweetFormValue.tweet}>    
                    </textarea>
                <input type="submit" />
            </form>
            {tweets.length >= 0
            ? tweets.map((tweet) => <Tweet key={tweet.id} message={tweet.message} author={tweet.user} delete={() => deleteTweet(tweet.id)}/> )
            : <p>Loading here</p>
            }
        </main>
    );
}

export default Home;