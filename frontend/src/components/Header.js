import React from "react";
import headerLogo from '../images/logo.svg';
import { Link, useNavigate } from "react-router-dom";

const Header = ({linkText, linkTo, loggedIn, email}) => {
  const navigate = useNavigate();
  function signOut(){
    localStorage.removeItem('token');
    navigate('/sign-in', {replace: true});
  }
  return (
    <header className="header">
      <img src={headerLogo} alt="логотип" className="header__logo" />
      <div className="header__text">
        {loggedIn && `${email}`}
        {loggedIn 
          ? <button onClick={signOut} className="header__button">Выйти</button>
          : <Link to={`${linkTo}`} className="header__link">{linkText}</Link>
        }
      </div>
    </header>
  );
}

export default Header;
