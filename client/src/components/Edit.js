import React, { Component }  from 'react';
import {edit, logout, deleteProfile} from './auth/auth-service';
import {Redirect} from 'react-router-dom';
import './style/Edit.css';
import Navbar from './Navbar';
// import 'bulma/css/bulma.css';

class Edit extends Component {
  state = {
    username: this.props.user.username,
  }

  logout = (event) => {
    logout()
      .then(response => {
        this.props.getUser(false);
        this.props.history.push("/");
      })
  }

  deleteProfile= () => {
    deleteProfile(this.props.user._id)
    .then(response => {
      this.props.getUser(null);
      this.props.history.push("/")
    })
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
      <>
        <Navbar user={this.state.user} />
      
      <div className="edit-profile">
        <div className="block-title-profile">
          <h1>Mon compte</h1>
        </div>

        <div className="block-form">
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <label className="label">Modifier mon nom d'utilisateur :
              <div className="control has-icons-left has-icons-right">
                <input className="input" type="text" name="username" value={this.state.username} onChange={event => this.handleChange(event)} />
                <span className="icon is-medium is-left">
                  <i className="fa-solid fa-user"></i>
                </span>
              </div>
              </label>
            </div>

            <div className="profileButtons">
                <button className="littleNext"
                >
                Mettre à jour</button>
             
              <div className="out">
                <button 
                onClick={this.logout}>Me déconnecter</button>
              </div>
              <div className="out">
              <button onClick={this.deleteProfile}>Supprimer mon compte</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      </>
    )
  }
}

export default Edit;