import React, { Component }  from 'react';
import { question, solution} from './question-service';
import { Redirect } from 'react-router-dom';
import { SiHtml5 } from 'react-icons/si';
import { SiJavascript } from 'react-icons/si';
import { SiCsswizardry } from 'react-icons/si';
import { SiReact } from 'react-icons/si';
import { BsEmojiLaughingFill } from 'react-icons/bs';
import { BsEmojiDizzyFill } from 'react-icons/bs';
import { BsEmojiSmileUpsideDownFill } from 'react-icons/bs';
import "../style/Question.css";

class Question extends Component {
    state={
        question:{},
        userResponse: '',
        solution: '',
        correct_answer: false,
        number: this.props.history.location.state.number,
        isClicked: false,
        nb_questions: 0,
        round: this.props.history.location.state.round
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
                })
            })
            .catch(err => this.setState({question: {}})) 
    }

    handleClick= (index) => {
        // réponse de 'user'
        this.setState(
            {userResponse: index},() => {
                //compare réponse et solution et crée Answer en DB
                solution(this.state.question._id, this.state.userResponse, this.state.round)
                .then(data => {
                    this.setState({
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
        const round = this.state.round  
        //gestion de la dernière question : si n° Q° = nb total Q° et après la réponse => résultats
        if(this.state.number === 'Toutes les questions' && this.state.nb_questions === this.props.history.location.state.question.total && this.state.isClicked) {
            return this.props.history.push({
                pathname: "/results",
                search: `?round=${round}`,
                state: {round:this.state.round}
            })
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
        const round = this.state.round 
        this.props.history.push({
            pathname: "/results",
            search: `?round=${round}`,
            state:{round: this.state.round}
        })
    }

    render(){
        if(this.props.user === false) return <Redirect to="/"/>

        const question = this.state.question;
        const number = this.state.number;
        const {category, difficulty, title, propositions} = question;
        const {isClicked} = this.state;

        //Récupération des icônes Category et Difficulty
        let catIcon;
        if (category === "HTML") {
            catIcon = <SiHtml5 className="outline-icon icons"/>
        } else if (category === "JS") {
            catIcon = <SiJavascript className="outline-icon icons"/>
        } else if (category === "CSS") {
            catIcon = <SiCsswizardry className="outline-icon icons" />
        } else { 
            catIcon = <SiReact className="outline-icon icons"/> 
        }

        let diffIcon;
        if (difficulty === 1) {
            diffIcon = <BsEmojiLaughingFill className="emoji1 icons"/>
        } else if (difficulty === 2) {
            diffIcon = <BsEmojiDizzyFill className="emoji2 icons"/>
        } else { 
            diffIcon = <BsEmojiSmileUpsideDownFill className="emoji3 icons"/>
        };
    
        return(
            
            <div className="question">
                <div className="block-title">
                    <h1>{title}</h1>
                </div>

                {/* <h2>Mes choix :</h2> */}
                <div className="question-container">
                    <label>
                        <input type="radio" name={category} className="icon-category"/>
                        {catIcon}
                    </label>

                    <label>
                        <input type="radio" name={difficulty} className="icon-difficulty" />
                        {diffIcon}
                    </label>
                </div>

                <div className="propositions-container">
                    <div className="proposition">
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
                <div>
                    {(number === 'Question unique' && isClicked) ? <button className="littleNext" onClick={(event)=> this.handleNext(event)}>Répondre à plus de questions</button>: ''}
                    {(number === 'Toutes les questions' && isClicked) ? <button className="littleNext gap" onClick={(event)=> this.handleNext(event)}>Suite</button>: ''}
                    {(number === 'Toutes les questions'&& isClicked) ? <button className="littleNext gap" onClick={(event)=> this.handleQuit(event)}>Stop</button> : ''}
                </div>
            </div>
        )
            
    }
}

export default Question;