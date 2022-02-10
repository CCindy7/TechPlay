import React, { Component }  from 'react';
import './style/Choices.css';

class Choices extends Component {
    state = {
      category:"",
      number:"",
      difficulty:""
    }
  
    query =()=> {}

    handleSubmit = (event) => {
      event.preventDefault(); // empêche soumission du formulaire et rafraichissement de la page
      (this.state.category, this.state.number, this.state.difficulty)
        .then(response=> {
          this.setState({ // remet à zéro le formulaire
            category:"",
            number:"",
            difficulty:""
          })
          this.props.getChoices(response);
          this.props.history.push(`/question&${this.match.params.category}&${this.match.params.number}&${this.match.params.diffuclty}`);
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
          <h1></h1>
          <form onSubmit={this.handleSubmit}>
            <label></label>
            <input type="text" name="" value={this.state.} onChange={event => this.handleChange(event)} />
  
            <label>Mot de passe</label>
            <input type="text" name="" value={this.state.} onChange={event => this.handleChange(event)} />
  
            <button></button>
          </form>
  
          
        </div>
      )
    }
  }
  
  export default Choices;