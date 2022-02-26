import React from 'react';
import './style/Navbar.css';
import { RiAccountCircleFill } from 'react-icons/ri';
// import {RiPlayCircleLine} from 'react-icons/ri';
// import { FcFaq } from 'react-icons/fc';
// import { RiQuestionAnswerFill } from 'react-icons/ri';
import { GiCardRandom } from 'react-icons/gi';


const Navbar = (props) => {
  return (
    <div className='navHolder'>
    <nav className="navbar">
        <div className="navbar-element">
          <a className="navbar-icons" href="/questions">
            <GiCardRandom className='start'/>
            {/* <RiPlayCircleLine className="start"/> */}
          </a>
          <a className="navbar-icons" href="/profile">
            <RiAccountCircleFill className="avatar"/>
          </a>
        </div>
    </nav>
    </div>
  )
}

export default Navbar;