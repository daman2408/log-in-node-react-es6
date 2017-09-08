import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';
import Styles from 'style-loader!css-loader?modules!./styles/styles.css';

alert('hello');

ReactDOM.render(<div>
  <App />
</div>, document.getElementById('root'));
