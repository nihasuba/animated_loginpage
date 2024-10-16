import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from './login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import User from './User';
import Admin from './Admin';


function App() {
  

  return (
    <>
    <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/User" element={<User />} /> 
                <Route path="/Admin" element={<Admin />} /> 
            </Routes>
        </Router>
      
    </>
  )
}

export default App
