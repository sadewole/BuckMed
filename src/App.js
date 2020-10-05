import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// import { createBrowserHistory } from 'history';
import routes, { renderRoutes } from './routes';
import AOS from 'aos';

import 'aos/dist/aos.css';
import 'src/static/style/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// const history = createBrowserHistory();

function App() {
  useEffect(() => {
    AOS.init({
      delay: 200,
      duration: 1200,
      once: false,
    });
    AOS.refresh();
  }, []);

  return <Router>{renderRoutes(routes)}</Router>;
}

export default App;
