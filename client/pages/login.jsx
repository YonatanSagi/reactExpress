import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Card, Button } from "@mui/material";
import '../css/login.css'
function Login() {
  let user = '';
  let pass = '';
  const navigate = useNavigate()
  const signin = async (user, pass) => {
    const req = await axios.post('/login/signin', {
      username: user,
      password: pass
    })
    if(req.data == 'good'){
     navigate('/home')
    }
    
  }
  return (
    <div className='baseDiv'>
      <Card className='loginContainer' variant='outlined' sx={{ minWidth: 275 }} color='gutterBottom'>
        <p>Login</p>
        <TextField onChange={(newValue) => { user = newValue.target.value; }} className='textField' placeholder='username'></TextField>
        <TextField onChange={(newValue) => { pass = newValue.target.value; }} className='textField' placeholder='password'></TextField>
        <div className='btnsDiv'>
          <Button className='btns' variant='outlinde' onClick={()=>{signin(user,pass)}} >Sign in</Button>
          <Button className='btns' variant='outlinde' onClick={()=>{navigate('/register')}} >Sign up</Button>
        </div>
      </Card>
    </div>
  );
}

export default Login;