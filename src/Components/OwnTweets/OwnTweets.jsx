import React, { useContext } from "react";
import { AuthContext } from '../../Context/AuthContext';
import Tweet from "../../Components/Tweet/Tweet";

const OwnTweets = () => {

    const { user, tweets } = useContext(AuthContext);

    return(
        <div className="Tweet-List">
            {tweets.map((tweet) => {
                if(tweet.uid === user.uid){
                    return(
                        <Tweet key={tweet.id} data={tweet}/>
                    )
                }
            })}
        </div>
    )

}

export default OwnTweets