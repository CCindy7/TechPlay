import React, { Component }  from 'react';
import { history } from './questions/question-service';
import './style/History.css';

class History extends Component {
    state={
        questions: [],
        sortBy:'',
        query:''
    }

    componentDidMount= () => {
        this.getHistory();
    }

    getHistory = () => {
        history()
            .then(data => {
                this.setState({
                questions: data
                })
            })
            .catch(err => this.setState({questions:[]})) 
    }

    handleQuery = (event) => {
        this.setState({
           query: event.target.value
        })
    }

    render() {
        let questionsCopy = [...this.state.questions];
        const {query} = this.state;

        // Classement par date, catégorie, difficulté ou réponse
        if(this.state.sortBy === 'order') {
            questionsCopy.sort((a,b)=> b.createdAt.localeCompare(a.createdAt))
        }
        if(this.state.sortBy === 'category') {
            questionsCopy.sort((a,b)=> a.question_id.category.localeCompare(b.question_id.category))
        }
        if(this.state.sortBy === 'ThreeToOne') {
            questionsCopy.sort((a,b)=> b.question_id.difficulty - a.question_id.difficulty)
        }
        if(this.state.sortBy === 'right_answer') {
            questionsCopy.sort((a,b)=> b.correct_answer - a.correct_answer)
        }
        if(this.state.sortBy === 'wrong_answer') {
            questionsCopy.sort((a,b)=> a.correct_answer - b.correct_answer)
        }

        //Recherche par titre de question
        if(query){
            questionsCopy = questionsCopy.filter(item => item.question_id.title.toLowerCase().includes(query.toLowerCase()));
        }
    
        return(
            <div className="history">
                <div className="block-title-question">
                    <h1>Mon historique</h1>
                </div>
                
                <label> Classer par : 
                    <select value={this.state.sortBy} name="sortBy" onChange={e=> this.setState({sortBy: e.target.value})}>
                        <option value="">Options</option>
                        <option value="order">Plus récent</option>
                        <option value="category">Catégorie</option>
                        <option value="ThreeToOne">Difficulté décroissante</option>
                        <option value="right_answer">Bonne réponse en 1er</option>
                        <option value="wrong_answer">Mauvaise réponse en 1er</option>
                    </select>
                </label>
                
                <form>
                  <label>Rechercher par titre de question : </label>
                  <input onChange={(event)=>{this.handleQuery(event)}} type="text" value={this.state.query}/>
                </form>

                <table>
                    <thead>
                        <tr>
                            <th>Enoncé</th>
                            <th>Catégorie</th>
                            <th>Difficulté</th>
                            <th>Date</th>
                            <th>Bonne réponse</th>
                            <th>Solution</th>
                        </tr>
                    </thead>
                    <tbody>
                    {questionsCopy.map(question => {
                        return (
                            <tr key={question._id}>
                                <td>{question.question_id.title}</td>
                                <td>{question.question_id.category}</td>
                                <td>{(question.question_id.difficulty === 1) ? "Facile":''} {(question.question_id.difficulty === 2) ? "Intermédiaire":''} {(question.question_id.difficulty === 3) ? "Difficile":''}</td>
                                <td>Le {`${question.createdAt}`.substring(8,10)}/{`${question.createdAt}`.substring(5,7)}/{`${question.createdAt}`.substring(0,4)} à {Number(`${question.createdAt}`.substring(11,13))+1}:{`${question.createdAt}`.substring(14,16)}</td>
                                <td>{question.correct_answer === true ? "oui" : "non"} </td>
                                <td>{question.question_id.propositions[question.question_id.solution]}</td>
                            </tr>
                        )  
                    })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default History;