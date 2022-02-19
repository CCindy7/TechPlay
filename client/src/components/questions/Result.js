import React, { Component } from 'react';
import {history} from './question-service';

class Result extends Component {
    state={
        nb_RightAnswers : 0,
        nb_questions: 0
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
                nb_RightAnswers: answers.filter(Boolean).length
                }, ()=> {
                    console.log('data:', data)
                })
            })
            .catch(err => this.setState({questions:[]})) 
    }

    render(){
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
          </div>
      )
    }
}

export default Result;