import React, { Component } from 'react';
import {history, question} from './question-service';

class Result extends Component {
    state={
        nb_RightAnswers : 0,
        nb_questions: 0,
        category:'',
        difficulty:null,
        number:'Toutes les questions',
    }

    componentDidMount=()=>{
        this.getResults()
    }

    getResults = () => {
        history()
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
                    difficulty : this.state.difficulty+1
                })
                this.props.history.push({
                pathname: '/question',
                search: `?category=${this.state.category}&difficulty=${this.state.difficulty}`,
                state: {question: response, number: this.state.number},
                })
            })
            .catch(err => this.setState({question: null}))
        } else {
            this.props.history.push("/questions")
        }
    }

    render(){
        const {difficulty} = this.state;
      return(
          <div className="result">
            <div className="block-title-question">
                <h1>Mon résultat</h1>
            </div>

            <div>
              <h3>Nombre de questions</h3>
              <p>{this.state.nb_questions}</p>

              <h3>Nombre de bonnes réponses</h3>
              <p>{this.state.nb_RightAnswers}</p>
            </div>

            {(difficulty === 1 || difficulty ===2) ? <button onClick={this.levelUp}>Je passe au niveau supérieur</button>:<button onClick={this.levelUp}>Je choisis une autre catégorie</button>}

          </div>
      )
    }
}

export default Result;