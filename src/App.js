import React from 'react';
import { LandingPage } from './components/pages';
import './App.css';
import NavBar from './components/layouts/NavBar';

function App() {
  return (
    <div className='App'>
      <NavBar />
      <LandingPage />
    </div>
  );
}

export default App;
