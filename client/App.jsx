import React from 'react';
import Login from './pages/login.jsx';
import Navbar from './pages/home.jsx';
import Register from './pages/register'
import { Route, Routes } from 'react-router-dom';
function App() {
  return (
    <>
    <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/home' element={<Navbar/>} />
    </Routes>
    </>
  );
}

export default App;
