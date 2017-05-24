import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import App from './components/App';
import './index.css';

ReactDOM.render(
  <Router>
    <Route exact={false} path="/" render={props => (
      <App />
      )}/>
  </Router>,
  document.getElementById('root') as HTMLElement
);
