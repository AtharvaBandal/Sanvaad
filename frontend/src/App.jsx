import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React from 'react';
import Home from './pages/home/Home.jsx';
import Login from './pages/login/Login.jsx';
import Signup from './pages/signup/Signup.jsx';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext.jsx';
import './App.css'; // Import your CSS file


function App() {
  const {authUser} = useAuthContext();
  return (
    <div className='relative'>
      <div className="header-logo"></div> {/* Logo positioned at top-left */}
      <div className='p-4 h-screen flex items-center justify-center'>
        <Routes>
          <Route path='/' element={authUser ? <Home/> : <Login/>} />
          <Route path='/login' element={authUser ? <Navigate to="/" /> : <Login/>} />
          <Route path='/signup' element={authUser ? <Navigate to="/" /> : <Signup/>} /> 
        </Routes>
        <Toaster/>
      </div>
    </div>
  );
}

export default App;
