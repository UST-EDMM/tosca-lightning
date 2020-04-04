import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, CssBaseline } from '@material-ui/core';

function App() {
  return (
    <CssBaseline>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <Button variant="contained" color="primary">
            Hello World
          </Button>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </CssBaseline>
  );
}

export default App;
