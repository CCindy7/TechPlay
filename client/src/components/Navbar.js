import React from 'react';
import './style/Navbar.css';
import { RiAccountCircleFill } from 'react-icons/ri';
import { RiQuestionAnswerFill } from 'react-icons/ri';
import { IoHome } from 'react-icons/io5';


const Navbar = (props) => {
  return (
    <nav className="navbar">
      {props.user ? (
        <div className="navbar-element">
          <a className="navbar-icons" href="/questions">
            <RiQuestionAnswerFill />
          </a>
          <a className="navbar-icons" href="/profile">
            <RiAccountCircleFill />
          </a>
        </div>
      ) : (
        <div className="navbar-element">
          <a className="navbar-icons" href="/">
            <IoHome />
          </a>
        </div>
      )}
    </nav>
  )
}

export default Navbar;