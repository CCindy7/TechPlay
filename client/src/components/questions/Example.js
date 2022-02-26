import React, { Component }  from 'react';
import '../style/Example.css';
import { SiJavascript } from 'react-icons/si';
import { BsEmojiLaughingFill } from 'react-icons/bs';

class Example extends Component {
    state={
        title:'Quel est le résultat de 2+2+\'2\' ?',
        category:'JS',
        difficulty:'1',
        propositions:['6', 'undefined', '42'],
        userResponse: '',
        solution: 2,
        correct_answer: false,
        isClicked: false,
    }

    
    handleClick= (index) => {
        // réponse de 'user'
        this.setState(
            {userResponse: index}, () => {
                if (this.state.solution === this.state.userResponse) {
                    this.setState({
                        correct_answer:true,
                        isClicked:true
                    })  
                } else {
                    this.setState({
                        correct_answer:false,
                        isClicked:true
                    }) 
                }
            }) 
    }

    // gestion du background color en fonction de la réponse de 'user'
    handleColors = (index) => {
        //si la réponse de 'user' est incorrect : wrong : background color red
        if (this.state.userResponse === index && this.state.userResponse !== this.state.solution) {
            return "wrong"
        
        // bonne réponse : right : background color green
        } else if (index === this.state.solution) {
            return "right"
        }
    }

    // renvoie au signup
    handleNext = () => {    
        this.props.history.push('/signup')
    }
       
    render(){
        return(
            <div className="question">
                <div className="block-title">
                    <h1>{this.state.title}</h1>
                </div>

                <h2>Catégorie et difficulté de la question : </h2>
                <div className="question-choices">
                    <label>
                        <input type="radio" name="JS" className="icon-category"/>
                        <SiJavascript className="outline-icon"/>
                        JavaScript
                    </label>

                    <label>
                        <input type="radio" name="1" className="icon-difficulty" />
                        <BsEmojiLaughingFill className="emoji1" />
                        Facile
                    </label>  
                </div>
                
                <div className="propositions-container">
                    <div className="proposition">
                        {this.state.propositions && this.state.propositions.map((proposition, index) => {
                            return (
                                <button 
                                className={`${this.state.userResponse !=='' && this.handleColors(index)}`} // style backgroundColor si userResponse n'est pas vide
                                key={index}
                                onClick={() => this.handleClick(index)}
                                //désactiver boutons des propositions si réponse n'est pas vide // 1 seule réponse possible
                                disabled={this.state.userResponse !== ''}
                                >
                                {proposition} 
                                </button> 
                            )
                        })}
                    
                    </div>  
                </div>
   
                {(this.state.isClicked) && <button className="next" onClick={(event)=> this.handleNext(event)}>Question suivante</button>}

                
            </div>
        )     
    }
}

export default Example;