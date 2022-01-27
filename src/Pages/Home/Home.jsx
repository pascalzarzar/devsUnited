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

    console.log(user);
    
    const createTweet = (e) => {
        e.preventDefault();
        const {username, bgColor, uid } = user;
        firestore.collection('tweets')
        .add({ ...tweetFormValue, uid: uid, username, bgColor, likes: 0  })
        .then(() => {
            setTweetFormValue({ tweet:'' });
        })
        .catch((err) => {
            console.log(err.message);
        });
    }

    const deleteTweet = (id) => {
        firestore.collection('tweets').doc(id).delete()
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
                        uid: doc.data().uid,
                        username: doc.data().username,
                        message: doc.data().message,
                        bgColor: doc.data().bgColor,
                        likes: doc.data().likes,
                        id: doc.id
                    };
                });
                setTweets(tweets);
            });
            auth.onAuthStateChanged((user) => {
                if(user !== null){
                    firestore.collection('users').where('uid', '==', user.uid)
                    .get()
                    .then((querySnapshot) => {
                        setUser(querySnapshot.docs[0].data());
                    })
                    .catch((err) => {
                        console.log(err.message);
                    })
                } else {
                    setUser(user);
                }
            });
            return () => desuscribir();
    },[setUser]);


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
            {console.log(tweets)}
            {tweets.length >= 0
            ? tweets.map((tweet) => {
                return(
                    <Tweet 
                    key={tweet.id}
                    uid={tweet.uid}  
                    message={tweet.message} 
                    username={tweet.username}
                    likes={tweet.likes}
                    bgColor={tweet.bgColor} 
                    delete={() => deleteTweet(tweet.id)}
                    /> 
                ) 
                })
            : <p>Loading here</p>
            }
        </main>
    );
}

export default Home;