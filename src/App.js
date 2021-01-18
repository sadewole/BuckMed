import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import routes, { renderRoutes } from './routes';
import AOS from 'aos';
import theme from 'src/theme';
import ScrollReset from './components/ScrollReset';

function App() {
  useEffect(() => {
    AOS.init({
      delay: 200,
      duration: 1200,
      once: false,
    });
    AOS.refresh();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <ScrollReset />
        {renderRoutes(routes)}
      </Router>
    </ThemeProvider>
  );
}

export default App;
