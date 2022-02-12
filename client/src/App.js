import './App.css';
import React, { Component} from 'react';
import { Switch, Route} from 'react-router-dom';
import Homepage from "./components/Homepage";
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import {loggedin} from './components/auth/auth-service';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import Edit from './components/Edit';
import Choices from './components/questions/Choices';
import Question from './components/questions/Question';
import { question } from './components/questions/question-service';
import Result from './components/questions/Result';

class App extends Component {
  // state loggedInUser sans valeur au départ
  state = { 
    user: {},
    questions:[] 
  } 

  // retrouver user connecté dès que composant App est monté
  fetchUser() {
    if (!this.state.user._id) {
      loggedin()
        .then(data => this.setState({user: data}))
        .catch(err => this.setState({user: false}))
    } else {
      console.log('user already in the state')
    }
  }

  fetchQuestions() {
    question()
      .then(data => this.setState({questions: data}))
      .catch(err =>this.setState({questions: null}))
  }

  getUser =(data) => {
    this.setState({user:data})
  }

  getQuestion = (data) => {
    this.setState({questions:data})
    console.log('question.data', data)
  }

  componentDidMount() {
    this.fetchUser();
    this.fetchQuestions();
  }

  render() {
    return (
      <Route render={props => (
        <div className="App">
          <Switch>
            <Route exact path="/" render={(props)=>(
              <Homepage user={this.state.user}/>
            )} />
            <>
              <Route path="/signup" render={(props)=>(
                <Signup getUser={this.getUser} history={props.history}/>
              )} />

              <Route path="/login" render={(props)=>(
                <Login getUser={this.getUser} history={props.history}/>
              )} />

              <Route path="/profile" render={(props)=>(
                <Profile user={this.state.user} getUser={this.getUser} history={props.history}/>
              )} />

              <Route path="/edit/:id" render={(props)=>(
                <Edit user={this.state.user} getUser={this.getUser} history={props.history}/>
              )} />

              <Route path="/questions" render={(props)=>(
                <Choices user={this.state.user} getUser={this.getUser} getQuestion={this.getQuestion} history={props.history} />
              )} />

              <Route exact path="/question&:category?&:number?&:difficulty?" render={(props)=>(
                <Question user={this.state.user} getUser={this.getUser} questions={this.state.questions} getQuestion={this.getQuestion} history={props.history}/>
              )} />

              <Route path="/result" render={(props)=>(
                <Result user={this.state.user} getUser={this.getUser} questions={this.state.questions} getQuestion={this.getQuestion} history={props.history}/>
              )} />

              <Navbar user={this.state.user} />
            </>
          </Switch> 
        </div>
      )}/>
    )
  }
}

export default App;