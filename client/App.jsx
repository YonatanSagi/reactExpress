import axios from 'axios';
import React, { useState,useEffect, useCallback } from 'react';
import Login from './pages/login.jsx';
import Protected from './auth/protected_routes.jsx';
import Register from './pages/register'
import { Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/usercontext.jsx';
import Home from './pages/home.jsx';
function App() {
  const [user, setUser] = useState();
  const [userLoaded, setUserLoaded] = useState(false);
  const getUser = useCallback(async () => {
    const req = await axios.get('/getuser')
    if (!req.data) return
    setUser(req.data)
    setUserLoaded(true)
  }, [])

  useEffect(() => {
    getUser().then(() => {
      setUserLoaded(true);
    });
  }, [getUser]);
  console.log(user)
  
  return (
    <>
      <UserProvider children={Routes}>
        <Routes>
          <Route path='/login' element={<Login getuser={getUser} />} />
          <Route path='/register' element={<Register />} />
          <Route path='/home' element={
            userLoaded ? <Protected children={<Home />} user={user}></Protected> : <></>
          } />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
