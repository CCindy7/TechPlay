import React, { Component } from 'react';
import {results, question} from './question-service';
import { Redirect } from 'react-router-dom';
import Navbar from '../Navbar';
import '../style/Result.css'

class Result extends Component {
    state={
        nb_RightAnswers : 0,
        nb_questions: 0,
        category:'',
        difficulty:null,
        number:'Toutes les questions',
        questions: [],
        question: {}, 
        round: ''
    }

    componentDidMount = () => {
        this.getRound();
        this.getResults()
    }

    getRound = () => {
        this.setState({round: this.props.history.location.state.round})
    }

    getResults = () => {
        results(`${this.props.history.location.state.round}`)
            .then(data => {
                //obtenir toutes les correct_answers
                const answers = [];
                for(let i = 0; i< data.length; i++) {
                    answers.push(data[i].correct_answer)
                }

                this.setState({
                nb_questions: data.length,

                //filtrer les correct_answers true et obtenir leur nb, puis update le state
                nb_RightAnswers: answers.filter(Boolean).length,

                difficulty: data[data.length-1].question_id.difficulty,
                category: data[data.length-1].question_id.category,
                })
            })
            .catch(err => this.setState({questions:[]})) 
    }

    levelUp = () => {
        if (this.state.difficulty === 1 || this.state.difficulty === 2) {
            question(this.state.category, this.state.difficulty+1)
                .then(response => {
                this.setState({
                    question: response,
                    difficulty : this.state.difficulty+1,
                })
                this.props.history.push({
                pathname: '/question',
                search: `?category=${this.state.category}&difficulty=${this.state.difficulty}`,
                state: {question: response, number: this.state.number, round: this.state.round},
                })
            })
            .catch(err => this.setState({question: null}))
        } else {
            this.props.history.push("/questions")
        }
    }

    render(){
        if(this.props.user === false) return <Redirect to="/"/>

        const {difficulty} = this.state;
        return(
          <>
            <Navbar user={this.state.user} />
          
          <div className="result">
            <div className="block-title">
                <h1>Résultats</h1>
            </div>

            <div className="results">
              <h3>Nombre de questions</h3>
              <p>{this.state.nb_questions}</p>

              <h3>Nombre de bonnes réponses</h3>
              <p>{this.state.nb_RightAnswers}</p>
            </div>

            <div>
                {(difficulty === 1 || difficulty ===2) ? <button className="littleNext" onClick={this.levelUp}>Je passe à la difficulté supérieure</button>:<button className="littleNext" onClick={this.levelUp}>Je choisis une autre catégorie</button>}
            </div>

          </div>
          </>
      )
    }
}

export default Result;