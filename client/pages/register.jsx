import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Card, Button } from "@mui/material";
import '../css/login.css'
function Login() {
  const [user, setuser] = useState();
  const [email, setemail] = useState();
  const [pass, setpass] = useState();
  const [iserr, setiserr] = useState(false);
  const [err, seterr] = useState("");
  const navigate = useNavigate()
  const register = async (user, email, pass) => {


    if (user == undefined || pass == undefined || email == undefined) {
      seterr('please fill all the fields')
      setiserr(true)
      return
    }
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) == false) {
      seterr('please enter a valid email addres')
      setiserr(true)
      return
    }
    try {
      const req = await axios.post('/register', {
        username: user,
        password: pass,
        email: email,
      })
      if (req.data == 'sameEmail') {
        seterr('a user with this email already exist')
        setiserr(true)
        return
      }
      if(req.status == 500){console.log('sgot');}
      navigate('/login')
    }
    catch {
      seterr('server error please try again later');
      setiserr(true)
      return
    }

  }
  return (
    <div className='baseDiv'>
      <Card className='loginContainer' variant='outlined' sx={{ minWidth: 275 }} color='gutterBottom'>
        <p>Sign up</p>
        <TextField onChange={(newValue) => { setuser(newValue.target.value) }} className='textField' placeholder='username'></TextField>
        <TextField onChange={(newValue) => { setemail(newValue.target.value) }} className='textField' placeholder='email' type='email'></TextField>
        <TextField onChange={(newValue) => { setpass(newValue.target.value) }} className='textField' placeholder='password' type='password'></TextField>
        <div className='btnsDiv'>
          <Button className='btns' variant='outlinde' onClick={() => { register(user, email, pass) }} >Register</Button>
          <Button className='btns' variant='outlinde' onClick={()=>{navigate('/login')}}>Already a member?</Button>
        </div>
        {iserr ? err : ''}
      </Card>
    </div>
  );
}

export default Login;