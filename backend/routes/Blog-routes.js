import express from 'express';
import { addBlog, deleteBlog, getAllBlogs, getById, getByUserId, updateBlog } from '../controllers/Blog-controller.js';

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.post("/add", addBlog);
blogRouter.put('/update/:id',updateBlog);
blogRouter.get("/:id",getById);
blogRouter.delete("/:id",deleteBlog)
blogRouter.get('/user/:id',getByUserId)

export default blogRouter;
