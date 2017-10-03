// Application entrypoint.

// Load up the application styles
require('../styles/application.scss');

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';


if (module.hot) {
 module.hot.accept();
}

ReactDOM.render(<App />, document.getElementById('react-root'));
