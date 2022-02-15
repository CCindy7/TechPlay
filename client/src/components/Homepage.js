import React, { Component }  from 'react';
import './style/Homepage.css';
import { Link } from 'react-router-dom';

class Homepage extends Component {
    render() {
        return (
            <div className="homepage">
              <h1 className="appName">&lt; TECH PLAY /&gt;</h1>
              <h3>Réussir vos entretiens techniques n'a jamais été aussi simple !</h3>
              <p>Créez votre compte et commencez à vous entraîner.</p>
              <Link className="btn" to="/signup">S'enregistrer</Link>
              <Link className="btn" to="/login">Se connecter</Link>
              <Link className="btn" to="/example">Voir un exemple</Link>
            </div>
        )
    }
}

export default Homepage;