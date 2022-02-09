import React, { Component }  from 'react';
import axios from 'axios';
import './style/Edit.css';

class Edit extends Component {
  state = {
    username: this.props.user.username
  }

  handleSubmit = (event) => {
    event.preventDefault(); // empêche soumission du formulaire et rafraichissement de la page
    axios.put(`http://localhost:5000/api/edit/${this.props.user._id}`, {username: this.state.username}, {withCredentials:true})
      .then((response)=> {
        this.setState({ // remet à zéro le formulaire
          username:""
        })
        this.props.getUser(response.data);
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
        <h1>Mes informations</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Nom d'utilisateur</label>
          <input type="text" name="username" value={this.state.username} onChange={event => this.handleChange(event)} />

          <button>Mettre à jour</button>
        </form>
      </div>
    )
  }
}

export default Edit;