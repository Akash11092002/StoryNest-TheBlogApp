import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from "react-router-dom";
import { Box, InputLabel, TextField, Typography, Button } from '@mui/material';

import axios from 'axios';

const labelStyles = { mb: 1, mt: 2, fontSize: '20px', fontWeight: 'bold' };
const BlogDetail = () => {

  const navigate=useNavigate();
   const [inputs, setInputs] = useState({
     
    });
  
    const handleChange = (e) => {
      setInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };
  
  const[blog,setBlog]=useState();

  const id = useParams().id;
    console.log(id);

    const fetchDetails =async ()=>{
      const res=await axios.get(`http://localhost:5000/api/blog/${id}`).catch(err=> console.log(err));
     const data=await res.data;
     return data;
  
  
    }
   useEffect(()=>{
       fetchDetails().then((data) => {
        setBlog(data.blog)
        setInputs({title:data.blog.title,
          description:data.blog.description,

        })
      
      })
      
   },[id]);

  const sendRequest =async()=>{
     const res= axios.put(`http://localhost:5000/api/blog/update/${id}`,{
      title:inputs.title,
      description:inputs.description
     }).catch(err => console.log(err));
  
     const data=await res.data
      return data;
    }




   console.log(blog);
   const handleSubmit =(e)=>{
    e.preventDefault();
    console.log(inputs);
   sendRequest().then(data=> console.log(data)).then(()=>navigate("/myBlogs/"))

   }

  return (
    <div>
     { inputs && 
        <form onSubmit={handleSubmit}>
            <Box
              border={3}
              borderColor="green"
              borderRadius={10}
              boxShadow="10px 10px 20px #ccc"
              padding={4}
              margin="auto"
              display="flex"
              flexDirection="column"
              width="50%"
              boxSizing="border-box"
            >
              <Typography fontWeight="bold" paddingBottom={2} color="grey" variant="h4" textAlign="center">
                Post Your Blog
              </Typography>
    
              <InputLabel sx={labelStyles}>Title</InputLabel>
              <TextField name="title" value={inputs.title} onChange={handleChange} variant="outlined" fullWidth />
    
              <InputLabel sx={labelStyles}>Description</InputLabel>
              <TextField name="description" value={inputs.description} onChange={handleChange} variant="outlined" fullWidth multiline rows={3} />
    
            
    
              <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
                Submit
              </Button>
            </Box>
          </form>}

    </div>
  )
}

export default BlogDetail ;
