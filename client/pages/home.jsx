import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useUserContext, useSetUserContext} from '../context/usercontext.jsx';
import axios from 'axios';
function home() {
  const user = useUserContext()
  const navigate = useNavigate()

  const logOut = async () => {
    const req = await axios.post('/logout')
    if (req.data) navigate('/login');
  }
  return (
    <>
      <p>welcome {user ? user.username : 'no'}</p>
      <Button onClick={() => { logOut() }}>logOut</Button>

    </>
  );
}

export default home;