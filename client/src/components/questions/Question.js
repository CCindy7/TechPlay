import React, { Component }  from 'react';
import { solution } from './question-service';
import {Redirect} from 'react-router-dom';
import '../style/Question.css';

class Question extends Component {
    state={
        currentQuestionIndex:0,
        questions : this.props.questions,
        response:null,
        solution:null,
        correct_answer: false,
    }
    
    componentDidMount(){
        this.fetchAnswer();
    }

    fetchAnswer= () => {
        solution(this.props.questions[this.state.currentQuestionIndex]._id)
          .then(data => this.setState({solution: data.data.solution, correct_answer:data.data.correct_answer}))
          .catch(err => this.setState({solution: null}))
       
    }

    handleClick= (index) => {
        this.setState(
            {response: index}, () => {
                if(this.state.response === this.state.solution) {
                    this.setState({correct_answer:true})
                }
            }
        )   
    }

    handleNext= ()=>{ 
        if(this.state.currentQuestionIndex === this.state.questions.lenght - 1) {
            <Redirect to="/result" />;
            return;
        }
        this.setState({
            currentQuestionIndex : this.state.currentQuestionIndex +1
        })  
    }
    
     //TODO
    // handleQuit = () => {
    //     return <Redirect to="/result" />
    // }

    render(){
        const {questions, currentQuestionIndex} = this.state
        console.log('this.state.questions', this.state.questions)

        if(this.props.questions[currentQuestionIndex] === undefined) {
            return <Redirect to="/result" />
        }
        
        const {category, difficulty, title, propositions, solution} = questions[currentQuestionIndex]
        
        
        return(
            <div>
                <h1>Question N°{currentQuestionIndex +1}</h1>

                <div>
                <h2>Mes choix</h2>
                <input type="image" src="" alt={category} name={category} />
                <input type="image" src="" alt={difficulty} name={difficulty}/>
                </div>

                 <div>
                <h3>{title}</h3>
                
                {propositions.map((proposition, index) => {
                    return (
                        <div key={index}>
                        
                         <button 
                          onClick={() => this.handleClick(index)}
                        //   style={{
                        //      backgroundColor: index === solution ? "right":""
                        //   }}
                         >
                          {proposition} 
                         </button>
                        
                        </div>
                    )   
                })}

                <button onClick={()=> this.handleNext()}>Je valide</button>
                </div>
                <button onClick={()=> this.handleQuit()}>J'arrête</button>
            </div>
        )
            
    }
}


export default Question;