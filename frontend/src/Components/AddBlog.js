import React, { useState } from 'react';
import { Box, InputLabel, TextField, Typography, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const labelStyles = { mb: 1, mt: 2, fontSize: '20px', fontWeight: 'bold' };

const AddBlog = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    imageURL: '',
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/blog/add', {
        title: inputs.title,
        description: inputs.description,
        image: inputs.imageURL,
        user: localStorage.getItem('userId'),
      });

      return res?.data; // Ensure res exists before accessing .data
    } catch (err) {
      console.error('Error posting blog:', err);
      return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then((data) => console.log(data)).then(()=>navigate("/blogs"));
  };

  return (
    <div>
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

          <InputLabel sx={labelStyles}>Image URL</InputLabel>
          <TextField name="imageURL" value={inputs.imageURL} onChange={handleChange} variant="outlined" fullWidth />

          <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddBlog;
