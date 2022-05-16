import logo from './logo.svg';
import './App.css';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import RouterComponent from '../src/router/RouterComponent';

function App() {
  return (
    <BrowserRouter>
            <RouterComponent/>

        </BrowserRouter>
  );
}

export default App;
