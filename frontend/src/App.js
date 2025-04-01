import Header from "./Components/Header";
import React from "react";
import Auth from "./Components/Auth";
import Blogs from "./Components/Blogs";
import UserBlogs from "./Components/UserBlogs";
import BlogDetail from "./Components/BlogDetail";
import AddBlog from './Components/AddBlog';
import { Route,Routes } from 'react-router-dom';
import { useSelector } from "react-redux";
import Home from "./Components/Home";

function App() {
   const isLoggedIn =useSelector(state => state.isLoggedIn);
   console.log(isLoggedIn);

  return (
  <React.Fragment>
   
    <header>
    <Header/>
    </header>

    <main>
      <Routes>
      <Route path="/" element={<Home/>}/>
       { !isLoggedIn? <Route path="/auth" element={<Auth/>}/>:
      <>  <Route path="/blogs" element={<Blogs/>}/>
        <Route path="/myBlogs" element={<UserBlogs/>}/>
        <Route path="/myBlogs/:id" element={<BlogDetail/>}/>
        <Route path="/blogs/add" element={<AddBlog/>}/>
        </>
       }
     
     
      </Routes>
    </main>
  </React.Fragment>
  );
}

export default App;
