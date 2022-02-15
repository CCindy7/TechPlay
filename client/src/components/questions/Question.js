import React, { Component }  from 'react';
import { question, solution } from './question-service';
// import {Redirect} from 'react-router-dom';
import '../style/Question.css';

class Question extends Component {
    state={
        question:this.props.history.location.state.question, // récupère la question de Choices (composant précédent)
        userResponse: '',
        solution: '',
        correct_answer: false,
    }

    handleClick= (index) => {
        // réponse de 'user'
        this.setState(
            {userResponse: index},() => {
                console.log('userResponse:', this.state.userResponse);
                console.log('this.state.question:', this.state.question)
                //compare réponse et solution et crée Answer en DB
                // PB à résoudre : crée Answer en DB 1 seule fois pour true and false
                solution(this.state.question._id, this.state.userResponse, this.state)
                .then(data => {this.setState({
                    correct_answer: data.correct_answer,
                    solution: data.solution
                }
                )})  
            }) 
    }

    // background color 
    handleColors = (index) => {
        // si réponse user n'est pas correcte => background color = wrong = red
        if (this.state.userResponse === index && this.state.userResponse !== this.state.solution) {
            return "wrong"
        
        // sinon afficher la bonne réponse en vert 
        } else if (index === this.state.solution) {
            return "right"
        }
    }

    // passage à la question suivante
    // TODO A vérifier + empêcher répétition
    handleNext = () => {
        //récupérer category et difficulty choisies au composant précédent (Choices)
        const category = this.props.history.location.state.question.category;
        const difficulty = this.props.history.location.state.question.difficulty;
        // rechercher une nouvelle question en fonction de la même catégorie et de la même difficulté
        question(category, difficulty)
            .then(data => {this.setState({
                question: data, 
                // réinitialiser userResponse à vide pour update le disabled
                userResponse: '', 
                }, () => {
                console.log('data', data)
            })})
    }
            
    // // TODO
    // handleQuit = () => {
    //     return <Redirect to="/result" />
    // }

    render(){
        const {question} = this.state
        // console.log('this.state.question', question)
        const {category, difficulty, title, propositions} = question
        
        return(
            
            <div>
                <h1>Question N° ?</h1>

                <div>
                    <h2>Mes choix :</h2>
                    <input type="image" src="" alt={category} name={category} />
                    <input type="image" src="" alt={difficulty} name={difficulty}/>
                </div>

                <div>
                    <h3>{title}</h3>
                    <div>
                        {propositions.map((proposition, index) => (
                            <button 
                            className={`${this.state.userResponse !=='' && this.handleColors(index)}`} // style backgroundColor si userResponse n'est pas vide
                            key={index}
                            onClick={() => this.handleClick(index)}
                            //désactiver boutons des propositions si réponse n'est pas vide // 1 seule réponse possible
                            disabled={this.state.userResponse !== ''}
                            >
                            {proposition} 
                            </button>    
                            
                        ))}
                    </div>  
                </div>
                <button onClick={(event)=> this.handleNext(event)}>Question suivante</button>
                <button onClick={(event)=> this.handleQuit(event)}>J'arrête</button>
            </div>
        )
            
    }
}

export default Question;