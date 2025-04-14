import express from 'express';
import { mongoose } from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';

import userRouter from "./routes/userRoute.js"



//app config
dotenv.config()
const app = express()
const port = process.env.PORT || 4000
mongoose.set('strictQuery', true)

//middlewares
app.use(express.json())
app.use(cors())

// db config
const connectToMongo = async () => {
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(process.env.MONGO_URI) 
        console.log('Mongo connected')
    }
    catch(error) {
        console.log(error)
        process.exit()
    }
    }
connectToMongo()

//api endpoint
app.use("/api/user", userRouter)
app.get('/' ,(req, res)=>{
    res.send("hello")
})

//listen
app.listen(port, () => console.log(`Listening on localhost:${port}`))