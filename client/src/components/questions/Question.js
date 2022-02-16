import React, { Component }  from 'react';
import { question, solution } from './question-service';
import {Redirect} from 'react-router-dom';
import '../style/Question.css';

class Question extends Component {
    state={
        question:{}, // state va être la question en cours. Vide par défaut, le serveur va lui donner sa valeur
        userResponse: '',
        solution: '',
        correct_answer: false,
    }

    componentDidMount= () => {
        this.getQuestion();
    }

    getQuestion = () => {
        //categorie et difficulté récupérés de Choices (composant précédent)
        console.log(this.props.history.location.state.question.category);
        console.log(this.props.history.location.state.question.difficulty);

        //demander au serveur quelle question afficher (data/objet)
        question(`${this.props.history.location.state.question.category}`, `${this.props.history.location.state.question.difficulty}`)
        .then(data => {
            //màj state question
            this.setState({
            question: data
            }, ()=> {
                console.log('question:', this.state.question)
            })
        })
        .catch(err => this.setState({question: {}}))
    }

    handleClick= (index) => {
        // réponse de 'user'
        this.setState(
            {userResponse: index},() => {
                console.log('userResponse:', this.state.userResponse);
                console.log('this.state.question:', this.state.question)
                //compare réponse et solution et crée Answer en DB
                solution(this.state.question._id, this.state.userResponse)
                .then(data => {this.setState({
                    correct_answer: data.correct_answer,
                    solution: data.solution
                })}) 
                .catch(err => this.setState({correct_answer: false, solution: ''})) 
            }) 
    }

    // background color 
    handleColors = (index) => {
        if (this.state.userResponse === index && this.state.userResponse !== this.state.solution) {
            return "wrong"
        
        // sinon afficher la bonne réponse en vert 
        } else if (index === this.state.solution) {
            return "right"
        }
    }

    // passage à la question suivante
    // TODO empêcher répétition
    handleNext = () => {
        this.getQuestion()
        // réinitialiser userResponse à vide pour update le disabled
        this.setState({
            userResponse:''
        })
    }
            
    // arrête l'entraînement
    handleQuit = () => {
        this.props.history.push('/result')
    }

    render(){
        const question = this.state.question
        console.log('this.state.question', question)
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
                        {propositions && propositions.map((proposition, index) => {
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
                <button onClick={(event)=> this.handleNext(event)}>Question suivante</button>
                <button onClick={(event)=> this.handleQuit(event)}>J'arrête</button>
            </div>
        )
            
    }
}

export default Question;