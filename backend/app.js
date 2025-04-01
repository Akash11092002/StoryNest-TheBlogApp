import express from 'express';
import mongoose from 'mongoose';
import router from './routes/User-routes';
import blogRouter  from './routes/Blog-routes';
import cors from 'cors';


const app= express();
app.use(express.json());
app.use(cors());



app.use("/api/user",router);
app.use("/api/blog",blogRouter);
mongoose.connect('mongodb+srv://newuser:VtcuaWVNW8jaIw5u@cluster0.nkq1u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    
  )
.then(()=>app.listen(5000))
.then(()=>console.log("connected to database"))
.catch((err)=>console.log(err));



//yna07CYN8AGN29jb