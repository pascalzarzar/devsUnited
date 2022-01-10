import React, {useState, useEffect, useContext} from 'react';
import { firestore } from '../../firebaseConfig';
import Tweet from '../../Components/Tweet/Tweet'
import { AuthContext } from '../../Context/AuthContext';


const Home = () => {

    const [tweets, setTweets] = useState({});
    const [tweetFormValue, setTweetFormValue] = useState({ user: '',tweet: ''});
    const {user, setUser} = useContext(AuthContext);

    const handleTweetForm = (e) => {
        setTweetFormValue({ ...tweetFormValue, [e.target.name]: e.target.value });
    };

    const createTweet = (e) => {
        e.preventDefault();
        firestore.collection('tweets')
        .add(tweetFormValue)
        .then(() => {
            setTweetFormValue({ tweet:'', user: '' });
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
                        id: doc.id
                    }
                })
                setTweets(tweets);
            });
            return () => desuscribir();
    },[]);


    return(
        <main className="Home">
            <form onSubmit={createTweet}>
                <input type="text" name="user" placeholder='user' onChange={handleTweetForm} value={tweetFormValue.user} />
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