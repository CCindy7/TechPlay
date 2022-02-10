import './App.css';
import React, { Component } from 'react';
import Homepage from './components/Homepage';
import Signup from './components/auth/Signup';
import {Switch, Route} from 'react-router-dom';
import Login from './components/auth/Login';
import Profile from './components/Profile';
import {loggedin} from './components/auth/auth-service';
import Edit from './components/Edit';
import Navbar from './components/Navbar';

class App extends Component {
  state = {
    user : {}
  }

  fetchUser = () => {
    if (!this.state.user._id){
      loggedin()
        .then(data => this.setState({user: data}))
        .catch(err => this.setState({user: false}));
    } else {
      console.log('user already in the state')
    }
  }

  getUser =(data) => {
    this.setState({user:data})
  }

  componentDidMount() {
    this.fetchUser();
  }
  
  render() {
    return (
      <Route render={props => (
        <div className="App">
          <Switch>
            <Route exact path="/" render={()=>(<Homepage user={this.state.user}/>)} />
            <>
              <Route path="/signup" render={(props)=>(<Signup getUser={this.getUser} history={props.history}/>)} />
              <Route path="/login" render={(props)=>(<Login getUser={this.getUser} history={props.history}/>)} />
              <Route path="/profile" render={(props)=>(<Profile user={this.state.user} getUser={this.getUser} history={props.history}/>)} />
              <Route path="/edit/:id" render={(props)=>(<Edit user={this.state.user} getUser={this.getUser} history={props.history}/>)} />
              <Navbar user={this.state.user} />
            </>
          </Switch> 
        </div>
      )}/>
    );
  }
  
}

export default App;