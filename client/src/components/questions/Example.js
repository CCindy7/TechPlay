import React, { Component }  from 'react';
import '../style/Example.css';
import { SiJavascript } from 'react-icons/si';
import { FaUserNinja } from 'react-icons/fa';

class Example extends Component {
    state={
        title:'Quel est le résultat de 7+1+"3" ?',
        category:'JS',
        difficulty:'1',
        propositions:['11', 'undefined', '83'],
        userResponse: '',
        solution: 2,
        correct_answer: false,
        isClicked: false,
    }

    
    handleClick= (index) => {
        // réponse de 'user'
        this.setState(
            {userResponse: index}, () => {
                if (this.state.solution === this.state.userResponse) {
                    this.setState({
                        correct_answer:true,
                        isClicked:true
                    })  
                } else {
                    this.setState({
                        correct_answer:false,
                        isClicked:true
                    }) 
                }
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

    // renvoie au signup
    handleNext = () => {    
        this.props.history.push('/signup')
    }
       
    render(){
        return(
            <div className="example">
                <div className="block-title-question">
                    <h1>Exemple</h1>
                </div>

                <div className="container-example">

                <div>
                    <h2>Ici vous retrouverez la catégorie de la question et son niveau de difficulté :</h2>
                    <label>
                        <input type="radio" name="JS" className="questionInput"/>
                        <SiJavascript className="outline-icon"/>
                    </label>

                    <label>
                        <input type="radio" name="1" className="questionInput" />
                        <FaUserNinja className="ninja1" />
                    </label>

                    
                </div>

                <div className="propositions-container">
                    <h3>{this.state.title}</h3>
                    <div className="proposition">
                        {this.state.propositions && this.state.propositions.map((proposition, index) => {
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
   
                {(this.state.isClicked) ? <button onClick={(event)=> this.handleNext(event)}>Question suivante</button>: ''}

                </div>
            </div>
        )     
    }
}

export default Example;