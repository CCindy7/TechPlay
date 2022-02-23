import React, { Component }  from 'react';
import {signup} from './auth-service';
import {Link} from 'react-router-dom';
import '../style/Signup.css';
import 'bulma/css/bulma.css';

class Signup extends Component {
  state = {
    username:"",
    email:"",
    password:"",
    confirmation:"",
    errorMessage:""
  }

  handleSubmit = (event) => {
    event.preventDefault(); // empêche soumission du formulaire et rafraichissement de la page
    signup(this.state.username, this.state.email, this.state.password, this.state.confirmation)
      .then(response=> {
        this.setState({ // remet à zéro le formulaire
          username :"",
          email:"",
          password:"",
          confirmation:""
        })
        this.props.getUser(response);
        this.props.history.push('/profile');
      })
      .catch(err =>{
        this.setState({errorMessage: err.response.data.message})
      })
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    return(
      <div className="signup">
        <div className="block-title-auth">
          <h1>S'enregistrer</h1>
        </div>

        <div className="block-form">
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <label className="label">Nom d'utilisateur</label>
              <div className="control has-icons-left has-icons-right">
                <input className="input" type="text" name="username" value={this.state.username} onChange={event => this.handleChange(event)}/>
                <span className="icon is-medium is-left">
                  <i className="fa-solid fa-user"></i>
                </span>
              </div>
            </div>

            <div className="field">
              <label className="label">Email</label>
              <div className="control has-icons-left has-icons-right">
                <input className="input" type="text" name="email" value={this.state.email} onChange={event => this.handleChange(event)}/>
                <span className="icon is-medium is-left">
                  <i className="fa-solid fa-envelope"></i>
                </span>
              </div>
            </div>

            <div className="field">
              <label className="label">Mot de passe</label>
              <div className="control has-icons-left has-icons-right">
                <input className="input" type="password" name="password" value={this.state.password} onChange={event => this.handleChange(event)} />
                <span className="icon is-medium is-left">
                  <i className="fa-solid fa-lock"></i>
                </span>
              </div>
            </div>

            <div className="field">
              <label className="label">Confirmez votre mot de passe</label>
              <div className="control has-icons-left has-icons-right">
                <input className="input" type="password" name="confirmation" value={this.state.confirmation} onChange={event => this.handleChange(event)} />
                <span className="icon is-medium is-left">
                  <i className="fa-solid fa-lock"></i>
                </span>
              </div>
            </div>

            <div className="btn-signup">
              <button className="button is-link">Créer mon compte</button>
            </div>

          </form> 
        </div>
        <Link to="/login">J'ai déjà un compte</Link>
        { this.state.errorMessage && (
          <div className="error-message">
            <p>{this.state.errorMessage}</p>
          </div>
        )}
      </div>
    )
  }
}

export default Signup;