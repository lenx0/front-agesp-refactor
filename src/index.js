import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import {AuthProvider} from './app/context/Auth';

ReactDOM.render(<AuthProvider><App/></AuthProvider>, 
    document.getElementById('root')
);