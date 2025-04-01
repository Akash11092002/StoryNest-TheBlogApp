import React, {  useState } from 'react'
import {Box, Button, TextField, Typography} from '@mui/material'
import axios from 'axios';
import {useDispatch} from 'react-redux';
import { authActions } from '../Store';
import {useNavigate} from 'react-router-dom'
const Auth = () => {

  const navigate = useNavigate()
  const dispath = useDispatch();
  const[inputs,setInputs]=useState({
    name:"",email:"",password:""
  })
  const[isSignUp,setisSignup]=useState(false)
  const handleChange=(e)=>{
    setInputs((prevState)=>({
    ...prevState,
      [e.target.name] : e.target.value,
      

    }))
  }

   const sendRequest =async (type="login") =>{
        const res= await axios.post(`https://storynest-theblogapp.onrender.com/api/user/${type}` ,{
          name:inputs.name,
          email:inputs.email,
          password:inputs.password

        }).catch(err => console.log(err));
        const data=await res.data;
          console.log(data);
        return data;

   }






  const handleSubmit=(e)=>{
    e.preventDefault()
    console.log(inputs);
   if(isSignUp){
    sendRequest("signup").then((data)=>localStorage.setItem("userId",data.user._id))
    .then(()=>dispath(authActions.login()))
    .then(()=>navigate("/blogs"))
    .then(data=>console.log(data))
   }else{
    sendRequest().then((data)=>localStorage.setItem("userId",data.user._id))
    .then(()=>dispath(authActions.login()))
    .then(()=>navigate("/blogs"))
    .then(data=>console.log(data))
   }
  }
  return (
    <div>
    <form onSubmit={handleSubmit}>
     <Box maxWidth={400} display='flex' flexDirection={'column'} alignItems='center' justifyContent='center' boxShadow='10px 10px 20px #ccc'   padding={3} margin='auto' marginTop={5} borderRadius={5}>
      <Typography variant='h2' padding={3} textAlign='center'>
        {isSignUp? 'SignUp':'Login'}
      </Typography>
{ isSignUp &&      <TextField  name='name'  onChange={handleChange}  value={inputs.name} margin='normal' placeholder='Name'/>
}      <TextField name='email' onChange={handleChange} value={inputs.email} type={'email'} margin='normal'  placeholder='Email'/>
      <TextField  name ='password' onChange={handleChange} value={inputs.password} type={'password'} margin= 'normal' placeholder='Password'/>
      <Button type='submit' variant='contained' sx={{borderRadius:3 ,marginTop:3}} color='warning'>Submit</Button>
      <Button sx={{borderRadius:3, marginTop:3}} onClick={()=>setisSignup(!isSignUp)}>Change To {isSignUp? 'Login':"SignUp"}</Button>
     </Box>


    </form>



    </div>
  )
}

export default Auth
