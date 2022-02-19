import React, { Component }  from 'react';
import { question, solution} from './question-service';
import '../style/Question.css';

class Question extends Component {
    state={
        question:{},
        userResponse: '',
        solution: '',
        correct_answer: false,
        number: this.props.history.location.state.number,
        isClicked: false,
        nb_questions: 0,
    }

    componentDidMount= () => {
        this.getQuestion();
    }

    getQuestion = () => {
        //categorie et difficulté récupérées de Choices (composant précédent)
        question(`${this.props.history.location.state.question.newQuestion.category}`, `${this.props.history.location.state.question.newQuestion.difficulty}`)
            .then(data => {
                this.setState({
                question: data.newQuestion
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
                    solution: data.solution,
                    isClicked:true,
                    nb_questions: this.state.nb_questions +1
                })}) 
                .catch(err => this.setState({correct_answer: false, solution:''})) 
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

    // passage à la question suivante
    handleNext = () => {    
        //gestion de la dernière question : si n° Q° = nb total Q° et après la réponse => résultats
        if(this.state.nb_questions === this.props.history.location.state.question.total && this.state.isClicked) {
            return this.props.history.push("/result")
        }

        // Q° suivante
        if (this.state.number === 'Toutes les questions') {
            this.getQuestion()
            // réinitialiser userResponse à vide pour update le disabled, et isClicked pour que les boutons apparaissent après le click
            this.setState({
                userResponse:'',
                isClicked:false
            })
        } else {
            // si Q° unique, pas de Q° suivante, mais retour aux choix
            this.props.history.push('/questions')
        }
    }
            
    // arrête l'entraînement => résultats
    handleQuit = () => {
        this.props.history.push('/result')
    }

    render(){
        const question = this.state.question;
        const number = this.state.number;
        const {category, difficulty, title, propositions} = question;
        const {isClicked} = this.state;
    
        return(
            
            <div className="question">
                <div className="block-title-question">
                    <h1>{number}</h1>
                </div>

                <div className="choicesRemind">
                    <h2>Mes choix :</h2>
                    <label>
                        <input type="radio" name={category} className="questionInput"/>
                        <img src="" alt={category}/>
                    </label>

                    <label>
                        <input type="radio" name={difficulty} className="questionInput" />
                        <img src="" alt={difficulty}/>
                    </label>
                </div>

                <div className="questionModel">
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
                {(number === 'Question unique' && isClicked) ? <button onClick={(event)=> this.handleNext(event)}>Répondre à plus de questions</button>: ''}
                {(number === 'Toutes les questions' && isClicked) ? <button onClick={(event)=> this.handleNext(event)}>Voir la suite</button>: ''}
                {(number === 'Toutes les questions'&& isClicked) ? <button onClick={(event)=> this.handleQuit(event)}>J'arrête</button> : ''}
                
            </div>
        )
            
    }
}

export default Question;