import react, {useContext} from "react";
import { AuthContext } from "../../Context/AuthContext";
import baseProfile from '../../assets/svg/profile.svg';
import logoTitle from '../../assets/svg/logo-title.svg';
import logoIcon from '../../assets/svg/logo-icon.svg';
import { Link } from "react-router-dom";
import './NavBar.css';

const NavBar = () => {

    const { user } = useContext(AuthContext);

    return(
        <div className="NavBar">
            <div className="NavBar-Container">
                <Link to='/profile'>
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
        </div>
    );
}

export default NavBar;