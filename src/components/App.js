import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import LogInForm from './LogInForm.js';
import SignUp from './SignUp.js';


class App extends React.Component {

  // state = {intialData: this.props.initialData};
  state = {};

  logIn = (e) => {
    e.preventDefault();
    //post object containing username and password to server
    //when response is received, save token to localStorage
    let user = {
      username: e.target.username.value,
      password: e.target.password.value
    };

    axios.post('/logIn', user)
      .then(resp => {
        if(resp.status === 200) {
          document.getElementById('usernameBox').className = 'form-group row has-success';
          document.getElementById('passwordBox').className = 'form-group row has-success';
          document.getElementById('passwordFeedback').style.display = 'none';
          localStorage.setItem('access_token', resp.data.token);
          console.log(resp.data);
          window.location = 'http://localhost:3000/welcome';
        }
      })
      .catch((error) => {
        if (error.response) {
          document.getElementById('usernameBox').className = 'form-group row has-danger';
          document.getElementById('passwordBox').className = 'form-group row has-danger';
          document.getElementById('passwordFeedback').style.display = 'block';
        }
      });
  }

  signUp = e => {
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

        console.log(resp.data);
        document.getElementById('emailDiv').className = 'form-group row has-success';
        document.getElementById('inputEmail').className = 'form-control form-control-success';
        document.getElementById('usernameFeedback').style.display = 'none';
        window.location = 'http://localhost:3000/welcome';
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

        <Switch>
          <Route exact path='/' render={() =>
            <LogInForm logIn={this.logIn}/>}>
          </Route>
          <Route exact path='/signup' render={() =>
            <SignUp signUp={this.signUp} />}>
          </Route>
        </Switch>

      </div>

    );
  }
}

App.propTypes = {
  initialData: PropTypes.object
};


export default App;
