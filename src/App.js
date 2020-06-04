import React from 'react';
import { LandingPage, AuthPage, Contact } from './components/pages';
import './App.css';
import NavBar from './components/layouts/NavBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <NavBar />
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
