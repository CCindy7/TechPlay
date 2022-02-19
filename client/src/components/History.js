import React, { Component }  from 'react';
import { history } from './questions/question-service';
import './style/History.css';

class History extends Component {
    state={
        questions: []
    }

    componentDidMount= () => {
        this.getHistory();
    }

    getHistory = () => {
        history()
            .then(data => {
                this.setState({
                questions: data
                }, ()=> {
                    console.log('questions:', this.state.questions)
                })
            })
            .catch(err => this.setState({questions:[]})) 
    }

    render() {
        const questions = this.state.questions;
    
        return(
            <div>
                <h1>Mon historique</h1>
                <br></br>
                {questions.map((question, index) => {
                    return(
                        <div key={index}>
                            <p><b>{question.question_id.title}</b></p>
                            <p><b>Le :</b>{question.createdAt}</p>
                            <p><b>Bonne réponse trouvée :</b> {question.correct_answer === true ? "oui" : "non"} </p>
                            <p><b>Solution :</b> {question.question_id.propositions[question.question_id.solution]}</p>
                            <br></br>
                        </div>
                    )
                    
                })}
            </div>
        )
    }
}

export default History;