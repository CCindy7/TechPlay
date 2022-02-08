import React, { Component }  from 'react';
import './style/Edit.css';
import {edit} from './auth/auth-service';

class Edit extends Component {
    state = {
        username: this.props.user.username
    }

    handleSubmit = (event) => {
        event.preventDefault(); // empêche soumission du formulaire et rafraichissement de la page
        edit(this.state.username)
          .then(response=> {
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

    componentDidUpdate={
        
    }

    render() {
        return(
            <div> 
              <h1>Mes informations</h1>
              <form onSubmit={this.handleSubmit}>
                <label>Nom d'utilisateur</label>
                <input type="text" name="username" value={this.state.username} onChange={event => this.handleChange(event)} />

                <button onClick={this.handleSubmit}>Mettre à jour</button>
              </form>
            </div>
        )
    }
}
export default Edit;