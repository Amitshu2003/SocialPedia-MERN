import express from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import postRoutes from "./routes/posts.js";
import userRoutes from './routes/users.js'
import dotenv from "dotenv"
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(bodyParser.json({limit:"30mb", extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}))
app.use(cors())


app.use('/posts',postRoutes)
app.use('/users',userRoutes)


mongoose.connect(process.env.MONGO_URL)
.then(()=>app.listen(PORT,()=>console.log(`Server running on port ${PORT}`)))
.catch((err)=>console.log(err))