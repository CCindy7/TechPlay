import React, { Component }  from 'react';
import { Link } from 'react-router-dom';
import './style/Homepage.css';

class Homepage extends Component {
    render() {
        return (
            <div className="homepage">
                <div className="block-title-homepage">
                    <h1 className="appName">&lt; TECH PLAY /&gt;</h1>
                </div>

                <div className="block-homepage">
                    <h3>Réussir vos entretiens techniques n'a jamais été aussi simple !</h3>
                    <p>Créez votre compte et commencez à vous entraîner.</p>
                    <Link className="btn" to="/signup">S'enregistrer</Link>
                    <Link className="btn" to="/login">Se connecter</Link>
                    <Link className="btn" to="/example">Découvrir</Link>
                </div>
              
            </div>
        )
    }
}

export default Homepage;