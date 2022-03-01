import React, { Component }  from 'react';
import { questionsHistory } from './questions/question-service';
import { Redirect } from 'react-router-dom';
import Navbar from './Navbar';
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
        questionsHistory()
            .then(data => {
                console.log('data', data)
                this.setState({
                questions: data
                })
                {/*document.getElementById("blockTitle").className = (this.questions ? "completed" : "null")*/}
            })
            .catch(err => this.setState({questions:[]})) 
    }

    handleQuery = (event) => {
        this.setState({
           query: event.target.value
        })
    }

    render() {
        if(this.props.user === false) return <Redirect to="/"/>

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

        //Conditional className
        
    
        return(
            <>
                <Navbar user={this.state.user} />
                <div className="history">
                    <div id="blockTitle" className="block-title">
                        <h1>Mon historique</h1>
                    </div>

                    {questionsCopy.length !== 0 ? (
                        <>
                            <div className="sortAndSearch">
                                <form>
                                    <label>Rechercher par énoncé
                                    <input onChange={(event)=>{this.handleQuery(event)}} type="text" value={this.state.query}/>
                                    </label>
                                </form>

                                <label> Classer par
                                    <select value={this.state.sortBy} name="sortBy" onChange={e=> this.setState({sortBy: e.target.value})}>
                                        <option value=""></option>
                                        <option value="order">Plus récent</option>
                                        <option value="category">Catégorie</option>
                                        <option value="ThreeToOne">Difficulté décroissante</option>
                                        <option value="right_answer">Bonne réponse en 1er</option>
                                        <option value="wrong_answer">Mauvaise réponse en 1er</option>
                                    </select>
                                </label>
                            </div>
                    
                            <div className="table-container">
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th>Enoncé</th>
                                            <th>Catégorie</th>
                                            <th>Difficulté</th>
                                            <th>Bonne réponse</th>
                                            <th>Solution</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {questionsCopy.map(question => {
                                        return (
                                            <tr key={question._id}>
                                                <td>{question.question_id.title}</td>
                                                <td>{question.question_id.category}</td>
                                                <td>{(question.question_id.difficulty === 1) ? "Facile":''} {(question.question_id.difficulty === 2) ? "Intermédiaire":''} {(question.question_id.difficulty === 3) ? "Difficile":''}</td>
                                                <td>{question.correct_answer === true ? "oui" : "non"} </td>
                                                <td>{question.question_id.propositions[question.question_id.solution]}</td>
                                                <td>{new Date(`${question.createdAt}`).toLocaleDateString("fr-FR")} à {('0'+ new Date(`${question.createdAt}`).getHours()).slice(-2)}:{('0' + new Date(`${question.createdAt}`).getMinutes()).slice(-2)} </td>
                                            </tr>
                                        )  
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    ) : (
                        <div className='null'> 
                            <h2>C'est bien vide ici !</h2> 
                            <h2>Il est grand temps de commencer à jouer !</h2>
                        </div>
                    )}
                </div>
            </>
        )
    }
}

export default History;