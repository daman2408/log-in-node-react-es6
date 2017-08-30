import React from 'react';
import {BrowserRouter as Router,
  Route,
  Link} from 'react-router-dom';
import LogInForm from './LogInForm.js';
import SignUp from './SignUp.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }



  render() {
    return (
      <div>
        <div className='mh-100'>
          <div className="jumbotron">
            <h1 className="display-1">My Project</h1>
          </div>
        </div>
        <Router>
          <div>
            <Route exact path="/" component={LogInForm}/>
            <Route path="/signup" component={SignUp} />
          </div>
        </Router>
      </div>

    )
  }
}

export default App;
