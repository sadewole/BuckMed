import React from 'react';
import { LandingPage, AuthPage, Contact } from './components/pages';
import './static/style/App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/contact' component={Contact} />
        <Route exact path='/register' component={AuthPage.Register} />
        <Route exact path='/login' component={AuthPage.Login} />
      </Switch>
    </Router>
  );
}

export default App;
