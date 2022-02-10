import React, { useContext } from "react";
import { AuthContext } from '../../Context/AuthContext';
import Tweet from "../../Components/Tweet/Tweet";

const FavTweets = () => {

    const { user, tweets } = useContext(AuthContext);

    return(
        <div className="Tweet-List">
            {tweets.length > 0 && tweets.map((tweet) => {
                const isFav = tweet.likes.findIndex((like) => user.uid === like);
                if(isFav >= 0) {
                    return (
                        <Tweet 
                        key={tweet.id}
                        data={tweet}
                        /> 
                    )
                }
                })
            }
        </div>
    )

}

export default FavTweets;
