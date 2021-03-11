import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@material-ui/core';
import routes, { renderRoutes } from './routes';
import AOS from 'aos';
import theme from 'src/theme';
import ScrollReset from 'src/components/ScrollReset';
import LoadingScreen from 'src/components/LoadingScreen';
import { fetchUser } from 'src/slices/auth';
import { useDispatch, useSelector } from 'src/store';

function App() {
  const dispatch = useDispatch();
  const { isInitialised } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(fetchUser());

    AOS.init({
      delay: 200,
      duration: 1200,
      once: false,
    });
    AOS.refresh();
  }, [dispatch]);

  if (!isInitialised) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        dense
        maxSnack={3}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <Router>
          <ScrollReset />
          {renderRoutes(routes)}
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
