import React from 'react';
import { LandingPage, AuthPage, Contact, AdminBoard } from './components/pages';
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
        <Route exact path='/admin' component={AdminBoard.Dashboard} />
        <Route exact path='/admin/patient' component={AdminBoard.Patients} />
        <Route exact path='/admin/doctor' component={AdminBoard.Doctors} />
        <Route
          exact
          path='/admin/appointment'
          component={AdminBoard.Appointment}
        />
        <Route exact path='/admin/finance' component={AdminBoard.Finance} />
      </Switch>
    </Router>
  );
}

export default App;
