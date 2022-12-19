import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import axios from 'axios';
function home() {

  const navigate = useNavigate()
  
  const logOut = async () => {
    const req = await axios.post('/home/logout')  
    if(req.data) navigate('/login');
  }

  return (
    <>
      <p>welcome</p>
      <Button onClick={() => {logOut()}}>logOut</Button>

    </>
  );
}

export default home;