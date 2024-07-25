import React from 'react';
import '../index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import Login from './Login';
import Chats from './Chats';

function App() {
  return (
    <div style={{ fontFamily: 'Avenir' }}>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/chats' element={<Chats />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
