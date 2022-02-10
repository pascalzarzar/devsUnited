import React, { useContext, useState } from "react";
import { AuthContext } from '../../Context/AuthContext';
import FavTweets from "../../Components/FavTweets/FavTweets";
import OwnTweets from "../../Components/OwnTweets/OwnTweets";
import baseProfile from '../../assets/svg/profile.svg'
import favoritesTab from '../../assets/svg/favorites.svg'
import postsTab from '../../assets/svg/posts.svg' 
import NavBar from "../../Components/NavBar/NavBar";
import { Navigate } from "react-router-dom";
import './Profile.css'

const Profile = () => {

    const [isFavs, setFavs] = useState(false);
    
    const handleTabs = () => {
        setFavs(!isFavs);
    }

    const { user } = useContext(AuthContext);


    if (user === null){ return <Navigate to='/'/> }

    return(
        <div className='Profile'>
            <NavBar/>
            <div className="Profile-Info">
                <div className='Profile-User'>
                    <img 
                    src={user.photoURL ? user.photoURL : baseProfile } 
                    className="Profile-User-Img" 
                    alt="user profile"
                    style={{borderColor: user.bgColor}} 
                    />
                    <h2 className='Profile-User-Username'style={{backgroundColor: user.bgColor}}>
                        {user.username}
                    </h2>
                </div>
                {isFavs 
                ? <img src={favoritesTab} alt="favorites tab active" onClick={handleTabs}/> 
                : <img src={postsTab} alt="posts tab active" onClick={handleTabs}/> 
                }
            </div>
            <div className="Profile-Tweets">
                {isFavs ? <FavTweets/> : <OwnTweets/>}
            </div>
        </div>
    )
}

export default Profile;