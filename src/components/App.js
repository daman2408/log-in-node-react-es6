import React from 'react';
import {StaticRouter as Router, Switch, Route} from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import LogInForm from './LogInForm.js';
import SignUp from './SignUp.js';

class App extends React.Component {

  state = {intialData: this.props.initialData};

  staticContext = {};

  logInSubmit = (e) => {
    e.preventDefault();
    //do something...
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
    axios.post('/signUp', user)
    .then((resp) => {
      if (resp.status === 200) {
        document.getElementById('emailDiv').className = 'form-group row has-success';
        document.getElementById('inputEmail').className = 'form-control form-control-success';
        document.getElementById('usernameFeedback').style.display = 'none';
      }
    })
      .catch((error) => {
        if (error.response) {
          //validation form username input;
          document.getElementById('emailDiv').className = 'form-group row has-danger';
          document.getElementById('inputEmail').className = 'form-control form-control-danger';
          document.getElementById('usernameFeedback').style.display = 'block';
        }
      });
  }

  render() {
    return (
      <div>
        <div className='mh-100'>
          <div className="jumbotron">
            <h1 className="display-1 title">My Project</h1>
          </div>
        </div>
        <Router context={this.staticContext}>
          <Switch>
            <Route exact path='/' render={() => <LogInForm submitFunction={this.logInSubmit}/>}/>
            <Route path='/signup' render={() => <SignUp submitFunction={this.signUpSubmit} />}></Route>
          </Switch>
        </Router>
      </div>

    );
  }
}

App.propTypes = {
  initialData: PropTypes.object
};


export default App;
