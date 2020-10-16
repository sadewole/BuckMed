import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import routes, { renderRoutes } from './routes';
import AOS from 'aos';

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
