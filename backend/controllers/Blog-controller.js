import Blog from "../model/Blog.js";
import User from "../model/User.js";
import mongoose from "mongoose";

export const getAllBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find().populate("user");
        if (!blogs || blogs.length === 0) {
            return res.status(404).json({ message: "No Blogs Found" });
        }
        return res.status(200).json({ blogs });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

export const addBlog = async (req, res, next) => {
    const { title, description, image, user } = req.body;

    let existingUser;
    try{
        existingUser=await User.findById(user);
    }
    catch(err){
      return  console.log(err);
    }
if (!existingUser){
    return res.status(400).json({message:"unable to find user with this id"})
}


    if (!title || !description || !image || !user) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const blog = new Blog({ title, description, image, user });

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        existingUser.blogs.push(blog);
        await existingUser.save({session})
       session.commitTransaction();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error saving blog", error: err.message });
    }
    return res.status(201).json({ blog });
};

export const updateBlog= async(req,res,next)=>{
    const{title,description}=req.body;
    
    const blogId= req.params.id;
    let blog;

    try{

        blog= await Blog.findByIdAndUpdate(blogId,{
            title,
            description
   
       })
                   
    }catch(err){
        return console.log(err);
    }
    
    if(!blog){
        return res.status(500).json({message:"unable to update the blog"})
    }
    return res.status(200).json({blog})
    
    
    
    
  


}

export const getById =async (req,res,next)=>{
    const id = req.params.id;
    let blog;
    try{
        blog= await Blog.findById(id)
    } catch(err){
        return console.log(err);
    }
    if(!blog){
        return res.status(404).json({message:"no blog found"});

    }

    return res.status(200).json({blog})
}

export const  deleteBlog=async(req,res,next)=>{


    const id= req.params.id;
    let blog;
    try{
        blog= await Blog.findByIdAndDelete(id).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    
    }
    catch(err){
       return console.log(err); 
    }
    if(!blog){
        return res.status(400).json({message:"unable to delete"});

    }
    return res.status(200).json({message:"Sucessfully deleted"})










}

export const getByUserId = async(req,res,next)=>{
    const userId= req.params.id;
    let userBlogs;
    try{
        userBlogs=await User.findById(userId).populate("blogs");

    }catch(err){
        return console.log(err);
    }
    if(!userBlogs){
        return  res.status(404).json({message:"not found"});

    }
    return res.status(200).json({user:userBlogs});
}

