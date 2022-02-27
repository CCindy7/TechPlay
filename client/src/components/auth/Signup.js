import React, { Component }  from 'react';
import {signup} from './auth-service';
import {Link} from 'react-router-dom';
import '../style/Auth.css';
import 'bulma/css/bulma.css';
import { IoHome } from 'react-icons/io5';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import { AiOutlineEye } from 'react-icons/ai';


class Signup extends Component {
  state = {
    username:"",
    email:"",
    password:"",
    confirmation:"",
    showPswd: false,
    eyePswd:<AiOutlineEyeInvisible/>,
    eyeConf: <AiOutlineEyeInvisible/>,
    showConf: false,
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
          confirmation:"",
          showPswd:false,
          showConf: false,
          eyePswd:<AiOutlineEyeInvisible/>,
          eyeConf: <AiOutlineEyeInvisible/>,
          errorMessage:''
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

  handlePassword = (event) => {
    this.setState({
      eyePswd: this.state.showPswd ?  <AiOutlineEyeInvisible/> :<AiOutlineEye/>,
      showPswd: !this.state.showPswd
    })
  }

  handleConfirmation = (event) => {
    this.setState({
      eyeConf: this.state.showConf ? <AiOutlineEyeInvisible/>: <AiOutlineEye/>,
      showConf: !this.state.showConf
    })
  }

  render() {
    return(
      <div className="auth auth-signup">
        <div className="block-title-auth">
          <h1>S'enregistrer</h1>
        </div>

        { this.state.errorMessage && (
          <div className="error-message">
            <p>{this.state.errorMessage}</p>
          </div>
        )}

        <div className="block-form">
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <label className="label">Nom d'utilisateur
              <div className="control has-icons-left">
                <input className="input" type="text" name="username" value={this.state.username} onChange={event => this.handleChange(event)}/>
                <span className="icon is-medium is-left">
                  <i className="fa-solid fa-user"></i>
                </span>
              </div>
              </label>
            </div>

            <div className="field">
              <label className="label">Email
              <div className="control has-icons-left">
                <input className="input" type="text" name="email" value={this.state.email} onChange={event => this.handleChange(event)}/>
                <span className="icon is-medium is-left">
                  <i className="fa-solid fa-envelope"></i>
                </span>
              </div>
              </label>
            </div>

            <div className="field">
              <label className="label">Mot de passe
              <div className="control has-icons-left">
                <input className="input" style={{position: "absolute"}} type={this.state.showPswd ? "text": "password"} name="password" value={this.state.password} onChange={event => this.handleChange(event)} />
                <span className="icon is-medium is-left">
                  <i className="fa-solid fa-lock"></i>
                </span>
                <button className="eye" type="button" onClick={this.handlePassword}>{this.state.eyePswd}</button>
              </div>
              </label>
            </div>

            <div className="field">
              <label className="label">Confirmez votre mot de passe
              <div className="control has-icons-left">
                <input className="input" style={{position: "absolute"}} type={this.state.showConf ? "text": "password"} name="confirmation" value={this.state.confirmation} onChange={event => this.handleChange(event)} />
                <span className="icon is-medium is-left">
                  <i className="fa-solid fa-lock"></i>
                </span>
                <button className="eye" type="button" onClick={this.handleConfirmation}>{this.state.eyeConf}</button>
              </div>
              </label>
            </div>

            <div className="btn-auth">
              <button className="next">Créer mon compte</button>
            </div>

          </form>

          <Link className="authLink" to="/login">J'ai déjà un compte</Link>
          
        </div>

        <div className="foot">
          <a className="footerLink" href="/">
            <IoHome/>
          </a>
        </div> 
        
      </div>
    )
  }
}

export default Signup;