import React from 'react';
import { Link } from 'react-router-dom';
import './style/Navbar.css';
import 'bulma/css/bulma.css';
import { RiAccountCircleFill } from 'react-icons/ri';
import { RiQuestionAnswerFill } from 'react-icons/ri';
import { IoHome } from 'react-icons/io5';


const Navbar = (props) => {
  return (
    <nav className="navbar is-light is-fixed-bottom" role="navigation" aria-label="main navigation">
      {props.user ? (
        <div className="navbar-item">
          <a className="navbar-item" href="/questions">
            <RiQuestionAnswerFill />
          </a>
          <a className="navbar-item" href="/profile">
            <RiAccountCircleFill />
          </a>
        </div>
      ) : (
        <div className="navbar-item">
          <a className="navbar-item" href="/">
            <IoHome />
          </a>
        </div>
      )}
    </nav>
  )
}

export default Navbar;