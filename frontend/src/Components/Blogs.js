import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Blog from './Blog';
const Blogs = () => {
  const [blogs, setBlogs] = useState([]); // Initialize as an empty array

  const sendRequest = async () => {
    try {
      const res = await axios.get("https://storynest-theblogapp.onrender.com/api/blog");
      return res.data; 
    } catch (err) {
      console.error("Error fetching blogs:", err);
      return { blogs: [] }; // Return an empty blogs array in case of error
    }
  };

  useEffect(() => { 
    sendRequest().then(data => setBlogs(data.blogs || []));
  }, []);

  return (
    <div>
   { blogs && blogs.map((blog,index)=>(
    <Blog  
    id={blog._id}
    isUser={localStorage.getItem("userId")=== blog.user._id
    }
    title={blog.title} 
    description={blog.description} 
    imageURL={blog.image} 
    userName={blog.user.name} />
   ))}
    </div>
  );
};

export default Blogs;
