import React, { useState } from 'react';
import {AppBar, Box, Button, Tab, Tabs, Toolbar, Typography} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../Store';
import { Navigate } from 'react-router-dom';
const Header = () => {
  const navigate=useNavigate();
 const dispatch= useDispatch();
  const isLoggedIn=useSelector((state)=> state.isLoggedIn);


 const[value,setValue]=useState()
  return (
     <AppBar
     position='sticky'
      sx={{background:"linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(192,100,228,1) 100%);"}}>
      <Toolbar>
        <Typography variant='h4'>
            StoryNest
        </Typography>
        {  isLoggedIn && <Box display="flex" marginLeft={'auto'} marginRight={'auto'}>
        <Tabs textColor='inherit' value={value} onChange={(e,val)=>setValue(val)}>
      <Tab LinkComponent={Link} to="/blogs" label='All Blogs' />
      <Tab  LinkComponent={Link} to="/myBlogs" label='My Blogs'/>
      <Tab  LinkComponent={Link} to="/blogs/add" label='Add Blog'/>

        </Tabs>
        </Box>}
        <Box display="flex" marginLeft='auto'>
          {!isLoggedIn && <> <Button   LinkComponent={Link} to="/auth" variant='contained'  sx={{margin:1,borderRadius:10}}color='warning'>Login</Button>
            <Button     LinkComponent={Link} to="/auth" variant='contained'  sx={{margin:1,borderRadius:10}}color='warning'>Signup</Button> </>}
          { isLoggedIn &&  <Button  onClick={()=>dispatch(authActions.logout())}
           LinkComponent={Link} to="/auth" variant='contained'  sx={{margin:1,borderRadius:10}}color='warning'>Logout</Button>}
        
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header