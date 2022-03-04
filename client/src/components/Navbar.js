import React from 'react';
import { RiAccountCircleFill } from 'react-icons/ri';
import {RiPlayCircleLine} from 'react-icons/ri';
import './style/Navbar.css';

const Navbar = (props) => {
  return (
    <div className='navHolder'>
    <nav className="nav">
          <a className="navLink1" href="/questions">
            <RiPlayCircleLine />
          </a>
          <a className="navLink2" href="/profile">
            <RiAccountCircleFill />
          </a>
    </nav>
    </div>
  )
}

export default Navbar;