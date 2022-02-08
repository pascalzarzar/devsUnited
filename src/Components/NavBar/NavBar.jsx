import react, {useContext} from "react";
import { AuthContext } from "../../Context/AuthContext";
import baseProfile from '../../assets/svg/profile.svg';
import logoTitle from '../../assets/svg/logo-title.svg';
import logoIcon from '../../assets/svg/logo-icon.svg';
import { Link } from "react-router-dom";
import back from '../../assets/svg/back.svg'
import logout from '../../assets/svg/logout.svg'
import './NavBar.css';

const NavBar = (props) => {

    const { user, userLogOut } = useContext(AuthContext);

    return(
        <div className="NavBar">
            {props.home
            ? <div className="NavBar-Container">
                    <Link to='/profile' style={{ textDecoration: 'none' }}>
                        <img src={user.photoURL ? user.photoURL : baseProfile} 
                        alt="user" 
                        className="NavBar-UserImg" 
                        style={{borderColor: user.bgColor}}
                        />
                    </Link>
                    <div className='NavBar-Logo'>
                        <img src={logoIcon} alt='logo icon' className="NavBar-LogoIcon" />
                        <img src={logoTitle} alt='logo title' />
                    </div>
                </div>
            : <div className="NavBar-Container">
                <Link to='/'>
                    <div className='NavBar-BackIcon'>
                        <img src={back} alt="back icon" />
                        <h3>{user.username}</h3>
                    </div>
                </Link>
                <div className='NavBar-LohOut'>
                    <img src={logout} alt="logout button" onClick={userLogOut}/>
                </div>
            </div>
            }
        </div>
    );
}

export default NavBar;