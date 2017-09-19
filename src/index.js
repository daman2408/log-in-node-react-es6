import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';
//make webpack watch for changes in css...not needed in production
import Styles from 'style-loader!css-loader?modules!./styles/styles.css';

ReactDOM.render(<div>
  <App />
</div>, document.getElementById('root'));
