import React from 'react';
import { Link } from 'react-router-dom';
import './style/Navbar.css';

const Navbar = (props) => {
  return (
    <nav className="nav-style">
      {props.user ? (
        <ul>
          <li><Link to="/questions"><img src="/images/play.gif" alt="questionlogo" /></Link></li>
          <li><Link to="/profile"><img src="/images/avatar.png" alt="avatarlogo" /></Link></li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to='/'><img src="/images/homepage.png" alt="homepagelogo" /></Link>
          </li>
        </ul>
      )}
    </nav>
  )
}

export default Navbar;