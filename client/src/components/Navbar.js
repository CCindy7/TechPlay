import React from 'react';
import { Link } from 'react-router-dom';
import './style/Navbar.css';
import 'bulma/css/bulma.css';

const Navbar = (props) => {
  return (
    <nav className="navbar is-expanded is-light is-fixed-bottom" role="navigation" aria-label="main navigation">
      {props.user ? (
        <div className="navbar-item">
          <a className="navbar-item" href="/questions">
            <span className="icon is-small"><i className="fa-solid fa-circle-question"></i></span>
          </a>
          <a className="navbar-item" href="/profile">
            <span className="icon is-small"><i className="fa-solid fa-user"></i></span>
          </a>
        </div>
      ) : (
        <div className="navbar-item">
          <a className="navbar-item" href="/">
            <span className="icon is-small"><i className="fa-solid fa-home"></i></span>
          </a>
        </div>
      )}
    </nav>
  )
}

export default Navbar;