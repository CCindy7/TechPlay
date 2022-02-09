import React, { Component }  from 'react';
import '../style/Login.css';
import {login} from './auth-service';
import {Link} from 'react-router-dom';

class Login extends Component {
  state = {
    email:"",
    password:"",
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
      .catch(err => console.log(err))
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    return(
      <div> 
        <h1>Se connecter</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Email</label>
          <input type="text" name="email" value={this.state.email} onChange={event => this.handleChange(event)} />

          <label>Mot de passe</label>
          <input type="password" name="password" value={this.state.password} onChange={event => this.handleChange(event)} />

          <button>Me connecter</button>
        </form>

        <Link to="/signup">Pas encore de compte ?</Link>
      </div>
    )
  }
}

export default Login;