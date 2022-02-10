import React, { Component }  from 'react';
import {edit, logout} from './auth/auth-service';
import {Redirect} from 'react-router-dom';
import './style/Edit.css';

class Edit extends Component {
  state = {
    username: this.props.user.username,
  }

  logout = (event) => {
    logout()
      .then(response => {
        this.props.getUser(false);
      })
    ;
  }

  handleSubmit = (event) => {
    event.preventDefault(); // empêche soumission du formulaire et rafraichissement de la page
    edit(this.props.user._id,this.state.username) 
    .then((response)=> {
        this.setState({ // remet à zéro le formulaire
          username:""
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
    if(this.props.user === false) return <Redirect to="/"/>

    return(
      <div> 
        <h1>Mon compte</h1>

  
        <form onSubmit={this.handleSubmit}>
          <label>Modifier mon nom d'utilisateur</label>
          <input type="text" name="username" value={this.state.username} onChange={event => this.handleChange(event)} />

          <button>Mettre à jour</button>
        </form>
        <br/>
        <button onClick={this.logout}>Logout</button>
      </div>
    )
  }
}

export default Edit;