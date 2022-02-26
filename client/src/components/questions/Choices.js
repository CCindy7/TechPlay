import React, { Component }  from 'react';
import { question} from './question-service';
import '../style/Choices.css'
import 'bulma/css/bulma.css';
import { SiHtml5 } from 'react-icons/si';
import { SiJavascript } from 'react-icons/si';
import { SiCsswizardry } from 'react-icons/si';
import { SiReact } from 'react-icons/si';
import { BsEmojiLaughingFill } from 'react-icons/bs';
import { BsEmojiDizzyFill } from 'react-icons/bs';
// import { BsEmojiSmileUpsideDownFill } from 'react-icons/bs';
import { FaGrimace } from 'react-icons/fa';
import uniqid from 'uniqid';
import Navbar from '../Navbar';

class Choices extends Component {
  state={
    category : 'HTML', // Valeur par défaut si user ne fait pas de choix
    difficulty:1, 
    number: 'Toutes les questions', 
    question:{},
    errorMessage:'',
    round:'',
  }

  chooseCat = (event) => {
    this.setState(
      {category: event.target.name}
    );
  }

  chooseDif = (event) => {
    this.setState(
      {difficulty: event.target.name}
    );
  }

  chooseNb = (event) => {
    this.setState(
      {number: event.target.name}
    );
  }

  handleSubmit = () => {
    const category= this.state.category;
    const difficulty= this.state.difficulty;
    const number = this.state.number;
    question(category, difficulty)
    .then(response => {
      this.setState({
        question: response, 
        round: uniqid()
      })
      this.props.history.push({
        pathname: '/question',
        search: `?category=${category}&difficulty=${difficulty}`,
        state: {question: response, number: number, round:this.state.round}
      })
    })
    .catch(err => {
      console.log("err", err)
      this.setState({errorMessage: err.response.data.message})
    })
  }

  render() {
    return(
      <>
      <Navbar user={this.state.user} />
      
      <div className="choices">
        
        <div className="block-title-questions">
          <h1>Mes choix</h1>
        </div>

        { this.state.errorMessage && (
          <div className="error-message">
            <p>{this.state.errorMessage}</p>
          </div>
          )}

        <div className="container-choices">

          <div className="category-box">
            <h3><b>Je choisis ma catégorie de question(s) :</b></h3>
            <div>
              <label className={(this.state.category === "HTML") ? "selected" :""}>
                <input className="icon-category" type="radio" value="HTML" name="HTML" onClick={event => this.chooseCat(event)} defaultChecked={true}/>
                <SiHtml5 className="outline-icon"/>
              </label>
              
              <label className={(this.state.category === "JS") ? "selected": ""}>
                <input className="icon-category" type="radio" value="JS" name="JS" onClick={event => this.chooseCat(event)} />
                <SiJavascript className="outline-icon"/>
              </label>
                          
              <label className={(this.state.category === "CSS") ? "selected": ""}>
                <input className="icon-category" type="radio" value="CSS" name="CSS" onClick={event => this.chooseCat(event)} />
                <SiCsswizardry className="outline-icon"/>
              </label>
              
              <label className={(this.state.category === "React") ? "selected":""}>
                <input className="icon-category" type="radio" value="React" name="React" onClick={event => this.chooseCat(event)} />
                <SiReact className="outline-icon"/>
              </label>
            </div>
          </div>


          <div className="number-box">
            <h3><b>Je choisis mon nombre de question(s) :</b></h3>
            <div className={(this.state.number === "Question unique") ? "selected" : ""}>
              <label>
                <input className="questionNb" type="text" value="Question unique" name="Question unique" onClick={event => this.chooseNb(event)} readOnly />
              </label>
            </div>
            <div className={(this.state.number === "Toutes les questions") ? "selected" : ""}>
              <label>
                <input className="questionNb" type="text" value="Toutes les questions" name="Toutes les questions" onClick={event => this.chooseNb(event)} defaultChecked={true} readOnly />
              </label>
            </div>
          </div>


          <div className="difficulty-box">            
            <h3><b>Je choisis le niveau de difficulté :</b></h3>            
            <div className="icon-display">
              
              <label className={(this.state.difficulty == 1) ? "selected": ""}>
                <input className="icon-difficulty" type="radio" value="1" name="1" onClick={event => this.chooseDif(event)} defaultChecked={true}/>
                <BsEmojiLaughingFill className="emoji1" />
                Facile                    
              </label>
                            
              <label className={(this.state.difficulty == 2) ? "selected": ""}>
                <input className="icon-difficulty" type="radio" value="2" name="2" onClick={event => this.chooseDif(event)} />              
                <FaGrimace className="emoji2" />
                Intermédiaire                            
              </label>        
           
              <label className={(this.state.difficulty == 3) ? "selected": ""}>
                <input className="icon-difficulty" type="radio" value="3" name="3" onClick={event => this.chooseDif(event)} />                
                <BsEmojiDizzyFill className="emoji3" />
                Difficile               
              </label>              
              
            </div>                  
          </div>

          <div>
            <button className="littleNext" onClick={()=> this.handleSubmit()}>C'est parti !</button>
          </div>

        </div>
        

      </div>
      </>
    )
  }
}
  
export default Choices;