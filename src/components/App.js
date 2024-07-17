import React from 'react'
import '../index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '../contexts/AuthContext'
import Login from './Login'
import Chats from './Chats'

function App() {
    return (
        <div style={{fontFamily: 'Avenir'}}>
            <Router>
            <AuthProvider>

                {/* <Switch> */}
                <Routes>

                    <Route path='/' Component={Login} />
                    <Route path='/chats' Component={Chats} />

                </Routes>

                {/* </Switch> */}
            </AuthProvider>
                
            </Router>
        </div>
    )
}


export default App