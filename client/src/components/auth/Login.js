import React, { Component }  from 'react';
import {login} from './auth-service';
import {Link} from 'react-router-dom';
import '../style/Login.css';
import 'bulma/css/bulma.css';

class Login extends Component {
  state = {
    email:"",
    password:"",
    errorMessage:''
  }

  handleSubmit = (event) => {
    event.preventDefault(); // empêche soumission du formulaire et rafraichissement de la page
    login(this.state.email, this.state.password)
      .then(response=> {
        this.setState({ // remet à zéro le formulaire
          email:"",
          password:"",
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
      <div className="login">
        <div className="block-title-auth">
          <h1>Se connecter</h1>
        </div>

        <div className="block-form">
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <label className="label">Email</label>
              <div className="control has-icons-left has-icons-right">
                <input className="input" type="text" name="email" value={this.state.email} onChange={event => this.handleChange(event)} />
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

            <div className="field is-grouped">
              <div className="control">
                <button className="button is-link">Me connecter</button>
              </div>
              <div className="control">
                <button className="button is-link is-light">Cancel</button>
              </div>
            </div>
          </form>
        </div>

        <Link to="/signup">Pas encore de compte ?</Link>
        { this.state.errorMessage && (
          <div className="error-message">
            <p>{this.state.errorMessage}</p>
          </div>
          )}
      </div>
    )
  }
}

export default Login;