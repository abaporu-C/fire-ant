import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route} from 'react-router-dom';  
import './index.css';
import App from './App';
import {Login} from './Routes/Auth/login.jsx';
import {Register} from './Routes/Auth/register.jsx';
import { Landing } from './Routes/landing'; 
import {WithAuth} from './Components/HigherOrder/WithAuth.jsx'
import {Welcome} from './Routes/Auth/welcome';
import reportWebVitals from './reportWebVitals';

const ProtectedApp = WithAuth(App);

ReactDOM.render(  
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/confirm/:confirmationCode" element={<Welcome />} />
        <Route path="/home" element={<ProtectedApp />} />
        <Route path="*" element={<main><h1>404: No Matches for this URL</h1></main>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
