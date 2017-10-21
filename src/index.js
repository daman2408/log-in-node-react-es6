import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';
import {BrowserRouter as Router} from 'react-router-dom';
//make webpack watch for changes in css...not needed in production
import Styles from 'style-loader!css-loader?modules!./styles/styles.css';

ReactDOM.render(
    <div>
      <Router>
        <App />
      </Router>
    </div>, document.getElementById('root'));
