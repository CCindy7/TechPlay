import React, { Component }  from 'react';
import '../style/Signup.css';
import {signup} from './auth-service';
import {Link} from 'react-router-dom';

class Signup extends Component {
  state = {
    username:"",
    email:"",
    password:"",
    confirmation:""
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
      .catch(err => console.log(err))
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    return(
      <div> 
        <h1>S'enregistrer</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Nom d'utilisateur</label>
          <input type="text" name="username" value={this.state.username} onChange={event => this.handleChange(event)} />

          <label>Email</label>
          <input type="text" name="email" value={this.state.email} onChange={event => this.handleChange(event)} />

          <label>Mot de passe</label>
          <input type="password" name="password" value={this.state.password} onChange={event => this.handleChange(event)} />

          <label>Confirmez votre mot de passe</label>
          <input type="password" name="confirmation" value={this.state.confirmation} onChange={event => this.handleChange(event)} />
          
          <button>Créer mon compte</button>
        </form>

        <p>En m'enregistrant, je reconnais avoir pris connaissance des <Link to="/termsandconditions">termes et conditions</Link>  de TechPlay</p>
        
        <Link to="/login">J'ai déjà un compte</Link>
      </div>
    )
  }
}

export default Signup;