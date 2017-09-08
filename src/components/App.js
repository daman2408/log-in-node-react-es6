import React from 'react';
import {BrowserRouter as Router,
  Route,
  Link} from 'react-router-dom';
import axios from 'axios';
import LogInForm from './LogInForm.js';
import SignUp from './SignUp.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

logInSubmit = (e) => {
  e.preventDefault();
  console.log(e.target.firstName.value);
  }

signUpSubmit = e => {
    e.preventDefault();
    let user = {
      first_name: e.target.firstName.value,
      last_name: e.target.lastName.value,
      username: e.target.email.value,
      password: e.target.password.value,
      gender: e.target.gridRadios.value
    };
    axios.post('/signUp', user);
  }


  render() {
    return (
      <div>
        <div className='mh-100'>
          <div className="jumbotron">
            <h1 className="display-1 title">My Project</h1>
          </div>
        </div>
        <Router>
          <div>
            <Route exact path="/" render={() => <LogInForm submitFunction={this.logInSubmit}/>}/>
            <Route path="/signup" render={() => <SignUp submitFunction={this.signUpSubmit}/>} />
          </div>
        </Router>
      </div>

    )
  }
}

export default App;
