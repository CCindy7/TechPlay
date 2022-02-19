import React, { Component }  from 'react';
import { question} from './question-service';
import '../style/Choices.css'
import 'bulma/css/bulma.css';
import { SiHtml5 } from 'react-icons/si';
import { SiJavascript } from 'react-icons/si';
import { SiCsswizardry } from 'react-icons/si';
import { SiReact } from 'react-icons/si';
import { GiStrongMan } from 'react-icons/gi';

//OK //changement de state sur du onclick / pas de formulaire
//OK //button  = appel à axios qui passe infos sous forme de data au composant qui est la page suivante / qui recupéra les infos
//OK valeur par défaut //si 3 states ne sont pas remplis, empêcher de passer à la suivante (alternative:choix par défaut)
//OK //3 fonctions différentes de onclick
// TODO CSS // highlighter les options sélectionnées

const categories = [
  'HTML',
  'JS',
  'CSS',
  'React'
];

const difficulties = [1, 2, 3]

const numbers = [
  'Question unique',
  'Toutes les questions'
];

class Choices extends Component {
  state={
    category : 'HTML', // Valeur par défaut si user ne fait pas de choix
    difficulty:1, 
    number: 'Toutes les questions', 
    question:{}
  }

  chooseCat = (event) => {
    this.setState(
      {category: event.target.name}
    );
  }

  chooseDif = (event) => {
    this.setState(
      {difficulty: event.target.name},  () => {
        console.log(this.state)
      }
    );
  }

  chooseNb = (event) => {
    this.setState(
      {number: event.target.name}, () => {
        console.log(this.state)
      }
    );
  }

  handleSubmit = () => {
    const category= this.state.category;
    const difficulty= this.state.difficulty;
    const number = this.state.number;
    question(category, difficulty)
    .then(response => {
      this.setState({
        question: response
      })
      this.props.history.push({
        pathname: '/question',
        search: `?category=${category}&difficulty=${difficulty}`,
        state: {question: response, number: number}
      })
    })
    .catch(err => this.setState({question: null}))
  }

  render() {
    return(
      <div className="choices">
        
        <div className="block-title-question">
          <h1>Mes choix</h1>
        </div>

        <div className="category-box">
          
            <h3>Je choisis ma catégorie de question(s) :</h3>
          

          <div className="grid-box">
            
            <label>
              <input className="icon-category" type="radio" value="HTML" name="HTML" onClick={event => this.chooseCat(event)}/>
              <SiHtml5 className="outline-icon"/>
            </label>
            
            <label>
              <input className="icon-category" type="radio" value="JS" name="JS" onClick={event => this.chooseCat(event)} />
              <SiJavascript className="outline-icon"/>
            </label>
                        
            <label>
              <input className="icon-category" type="radio" value="CSS" name="CSS" onClick={event => this.chooseCat(event)} />
              <SiCsswizardry className="outline-icon"/>
            </label>
            
            <label>
              <input className="icon-category" type="radio" value="React" name="React" onClick={event => this.chooseCat(event)} />
              <SiReact className="outline-icon"/>
            </label>

          </div>
        </div>

        <h3>Je choisis mon nombre de question(s) :</h3>
        {numbers.map((nb, index) => {
          return(
            <label key={index}>
            <input type="text" value={nb} name={nb} onClick={event => this.chooseNb(event)} readOnly/>
            </label>
          )
        })}

        <div>
          <h3>Je choisis le niveau de difficulté :</h3>
          <div className="difficulty-box">
            <label>
              <input className="icon-difficulty" type="radio" value="1" name="1" onClick={event => this.chooseDif(event)} />
              
            </label>
          </div>

          <div className="difficulty-box">
            <label>
              <input className="icon-difficulty" type="radio" value="2" name="2" onClick={event => this.chooseDif(event)} />
              
            </label>
          </div>

          <div className="difficulty-box">
            <label>
              <input className="icon-difficulty" type="radio" value="3" name="3" onClick={event => this.chooseDif(event)} />
              <GiStrongMan />
            </label>
          </div>          
        </div>

        <button onClick={()=> this.handleSubmit()}>C'est parti !</button>

      </div>
    )
  }
}
  
export default Choices;