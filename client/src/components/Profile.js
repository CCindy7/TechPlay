import React, { Component }  from 'react';
import './style/Profile.css';
import {Link, Redirect} from 'react-router-dom';

class Profile extends Component {
    state={
        username: this.props.user.username
    }

    render() {
        if(this.props.user === false) return <Redirect to="/"/>

        return(
            <div>
                <h1>Bienvenue {this.props.user.username} !</h1>
                <img src="" alt="questionspic"/>
                <Link to='/questions'>Je commence</Link>
                <img src="" alt="historypic"/>
                <Link to='/history'>Mon historique</Link>
                <img src="" alt="editpic"/>
                <Link to={`/edit/${this.props.user._id}`}>Mes infos</Link>
            </div>
        )
    }
}

export default Profile;