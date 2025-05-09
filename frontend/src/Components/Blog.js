import React from "react";
import {
  Box,
  Card,
  Avatar,
  CardContent,
  CardMedia,
  Typography,
  CardHeader,
  IconButton,
} from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Blog = ({ title, description, imageURL, userName, isUser, id }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
  };

 const deleteRequest =async() =>{
   const res = await axios.delete(`https://storynest-theblogapp.onrender.com/api/blog/${id}`).catch(err => console.log(err));
  const data= await res.data;
  return data;

  }

  const handleDelete = () => {
   deleteRequest().then(()=> navigate("/")).then(()=> navigate("/blogs"))
  };

  return (
    <div>
      <Card
        sx={{
          width: "40%",
          margin: "auto",
          mt: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        {isUser && (
          <Box display="flex">
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              <ModeEditIcon  color="warning"/>
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteForeverIcon color="error" />
            </IconButton>
          </Box>
        )}

        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {userName?.charAt(0) || ""}
            </Avatar>
          }
          title={title}
        />
        <CardMedia component="img" height="194" image={imageURL} alt="Blog Image" />
        
        <CardContent>
        <hr/>
        <br/>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            <b>{userName}</b>: {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Blog;
