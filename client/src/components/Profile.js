import React, { Component }  from 'react';
import './style/Profile.css';
import {Link, Redirect} from 'react-router-dom';
import 'bulma/css/bulma.css';
import { FaUserCog } from 'react-icons/fa';
import { FaHistory } from 'react-icons/fa';
import { RiQuestionAnswerFill } from 'react-icons/ri';
import { FcFaq } from 'react-icons/fc';
import { FcServices } from 'react-icons/fc';
import { FcPositiveDynamic } from 'react-icons/fc';
import { FcRatings } from 'react-icons/fc';
import { RiQuestionAnswerLine } from 'react-icons/ri';
import { RiUserSettingsLine } from 'react-icons/ri';
import { RiHistoryLine } from 'react-icons/ri';


class Profile extends Component {
    state={
        username: this.props.user.username
    }

    render() {
        if(this.props.user === false) return <Redirect to="/"/>

        return(
            <div className="profile">
                <div className="block-title-profile">
                    <h1>Bienvenue {this.props.user.username} !</h1>
                </div>

                <div className="container-profile">
                
                    <div className="profile-box">
                        {/*<RiQuestionAnswerFill className="outline-icon-profile" />*/}
                        <RiQuestionAnswerLine className="outline-icon-profile" />
                        {/*<FcFaq className="outline-icon-profile" />*/}
                        <Link to='/questions'>Je commence</Link>
                    </div>
                    
                    <div className="profile-box">
                        {/*<FaHistory className="outline-icon-profile" />*/}
                        <RiHistoryLine className="outline-icon-profile" />
                        {/*<FcPositiveDynamic className="outline-icon-profile" />*/}
                        {/*<FcRatings className="outline-icon-profile" />*/}
                        <Link to='/history'>Mon historique</Link>
                    </div>
                    
                    <div className="profile-box">
                        {/*<FaUserCog className="outline-icon-profile"/>*/}
                        <RiUserSettingsLine className="outline-icon-profile" />
                        {/*<FcServices className="outline-icon-profile"/>*/}
                        <Link to={`/edit/${this.props.user._id}`}>Mon compte</Link>
                    </div>

                </div>

            </div>
        )
    }
}

export default Profile;