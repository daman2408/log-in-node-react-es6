import React from 'react';
import LogInForm from './LogInForm.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  formSubmit = (e) => {
    e.preventDefault();
    console.log('submitted');
  }

  render() {
    return (
      <div className='mh-100'>
        <div className="jumbotron">
          <h1 className="display-1">My Project</h1>
        </div>
        <LogInForm submitFunction={this.formSubmit}/>
      </div>
    )
  }
}

export default App;
