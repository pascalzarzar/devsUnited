import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from '../../Context/AuthContext';
import FavTweets from "../../Components/FavTweets/FavTweets";
import OwnTweets from "../../Components/OwnTweets/OwnTweets";
import logo from '../../logo.svg'
import favoritesTab from '../../assets/svg/favorites.svg'
import postsTab from '../../assets/svg/posts.svg' 

const Profile = () => {

    const [isFavs, setFavs] = useState(false);
    
    const handleTabs = () => {
        setFavs(!isFavs);
    }


    return(
        <div>
            <div>
                <img src={logo} alt="user profile" />
            </div>
            <div>
                {isFavs 
                ? <img src={favoritesTab} alt="favorites tab active" onClick={handleTabs}/> 
                : <img src={postsTab} alt="posts tab active" onClick={handleTabs}/> 
                }
            </div>
            {isFavs ? <FavTweets/> : <OwnTweets/>}
        </div>
    )
}

export default Profile;