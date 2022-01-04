import React, {useState, useEffect} from 'react';
import { firestore } from '../../firebaseConfig';
import Tweet from '../../Components/Tweet/Tweet'

const Home = () => {

const [tweets, setTweets] = useState({});

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
            <form action="">
                <textarea name="tweet" id="tweet" cols="30" rows="10"></textarea>
                <input type="button" value="post" />
            </form>
            {tweets.length >= 0
            ? tweets.map((tweet) => <Tweet  key={tweet.id} message={tweet.message} author={tweet.user}/> )
            : <p>Loading here</p>
            }
        </main>
    );
}

export default Home;