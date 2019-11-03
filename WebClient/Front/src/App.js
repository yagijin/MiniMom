import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainContainer from './cmp/MainContainer';
import './style.css';

function App() {
  return (
    <Router>
      <MainContainer />
    </Router>
  );
}

export default App;
