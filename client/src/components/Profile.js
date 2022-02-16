import React, { Component }  from 'react';
import './style/Profile.css';
import {Link, Redirect} from 'react-router-dom';
import 'bulma/css/bulma.css';

class Profile extends Component {
    state={
        username: this.props.user.username
    }

    render() {
        if(this.props.user === false) return <Redirect to="/"/>

        return(
            <div className="profile">
                <h1>Bienvenue {this.props.user.username} !</h1>
                <figure className="image is-128x128">
                    <img src="/images/Q&A.png" alt="questionspic"/>
                </figure>
                <Link to='/questions'>Je commence</Link>
                <figure className="image is-128x128">
                    <img src="/images/target.png" alt="historypic"/>
                </figure>
                <Link to='/history'>Mon historique</Link>
                <figure className="image is-128x128">
                    <img src="/images/account.png" alt="editpic"/>
                </figure>
                <Link to={`/edit/${this.props.user._id}`}>Mes infos</Link>
            </div>
        )
    }
}

export default Profile;