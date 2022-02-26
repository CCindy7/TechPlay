import React, { Component }  from 'react';
import {login} from './auth-service';
import {Link} from 'react-router-dom';
import '../style/Auth.css';
import 'bulma/css/bulma.css';
import { IoHome } from 'react-icons/io5';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import { AiOutlineEye } from 'react-icons/ai';


class Login extends Component {
  state = {
    email:"",
    password:"",
    showPswd: false,
    eyePswd:<AiOutlineEyeInvisible/>,
    errorMessage:''
  }

  handleSubmit = (event) => {
    event.preventDefault(); // empêche soumission du formulaire et rafraichissement de la page
    login(this.state.email, this.state.password)
      .then(response=> {
        this.setState({ // remet à zéro le formulaire
          email:"",
          password:"",
          showPswd: false,
          eyePswd:<AiOutlineEyeInvisible/>,
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

  handleVisibility = (event) => {
    this.setState({
      eyePswd: this.state.showPswd ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>,
      showPswd: !this.state.showPswd
    })
  }

  render() {
    return(
      <div className="auth">
        <div className="block-title-auth">
          <h1>Se connecter</h1>
        </div>

        { this.state.errorMessage && (
          <div className="error-message">
            <p>{this.state.errorMessage}</p>
          </div>
          )}

        <div className="block-form">
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <label className="label">Email
              <div className="control has-icons-left has-icons-right">
                <input className="input" type="text" name="email" value={this.state.email} onChange={event => this.handleChange(event)} />
                <span className="icon is-medium is-left">
                  <i className="fa-solid fa-envelope"></i>
                </span>
              </div>
              </label>
            </div>

            <div className="field">
              <label className="label">Mot de passe
              <div className="control has-icons-left has-icons-right">
                <input className="input" type={this.state.showPswd ? "text": "password"} name="password" value={this.state.password} onChange={event => this.handleChange(event)} />
                <span className="icon is-medium is-left">
                  <i className="fa-solid fa-lock"></i>
                </span>
              <button className="eye" onClick={this.handleVisibility}>{this.state.eyePswd}</button>
              </div>
              </label>
            </div>
            
            <div className="btn-auth">
              <button className="next">Me connecter</button>
            </div>
            
          </form>
        </div>

        <Link className="authLink" to="/signup">Pas encore de compte ?</Link>

        <div className="foot">
          <a className="footerLink" href="/">
            <IoHome className='home'/>
          </a>
        </div> 
        
      </div>
    )
  }
}

export default Login;