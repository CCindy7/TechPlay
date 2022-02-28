import React from 'react';
import './style/Navbar.css';
import { RiAccountCircleFill } from 'react-icons/ri';
import {RiPlayCircleLine} from 'react-icons/ri';
// import { FcFaq } from 'react-icons/fc';
// import { RiQuestionAnswerFill } from 'react-icons/ri';
// import { GiCardRandom } from 'react-icons/gi';


const Navbar = (props) => {
  return (
    <div className='navHolder'>
    <nav className="nav">
          <a className="navLink1" href="/questions">
            {/* <GiCardRandom /> */}
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