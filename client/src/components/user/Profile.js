import React, { Component }  from 'react';
import {Link, Redirect} from 'react-router-dom';
import { FcFaq } from 'react-icons/fc';
import { FcServices } from 'react-icons/fc';
import { FcRatings } from 'react-icons/fc';
import '../style/Profile.css';
import 'bulma/css/bulma.css';

class Profile extends Component {
    state={
        username: ''
    }

    componentDidMount = () => {
        this.getUsername();
    }

    getUsername = () => {
        this.setState({username: this.props.user.username})
    }

    render() {
        if(this.props.user === false) return <Redirect to="/"/>

        return(
            <div className="profile">
                <div className="block-title-profile">
                    <h1>Bienvenue {this.props.user.username}</h1>
                </div>

                <div className="container-profile">
  
                    <div className="profile-box1">
                        <FcFaq className="outline-icon-profile" />
                        <Link className="container-profile-links" to='/questions'>Je commence</Link>
                    </div>

                    <div className="container-profile-row2">
                    
                    <div className="profile-box2">
                        <FcRatings className="outline-icon-profile" />
                        <Link className="container-profile-links" to='/history'>Mon historique</Link>
                    </div>
                    
                    <div className="profile-box2">
                        <FcServices className="outline-icon-profile"/>
                        <Link className="container-profile-links" to={`/edit/${this.props.user._id}`}>Mon compte</Link>
                    </div>
                    </div>

                </div>

            </div>
        )
    }
}

export default Profile;