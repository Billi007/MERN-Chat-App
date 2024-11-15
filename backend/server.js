import express from "express";
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route.js'
import dbConnect from "./db/dbConnection.js";
import messageRoutes from './routes/message.route.js'
import cookieParser from "cookie-parser";
import userRoutes from './routes/user.route.js'

const app = express();
const port = process.env.PORT || 5000;

dotenv.config();
app.use(express.json()); // to pasrse incoming routes with JSON payload(from req.body)
app.use(cookieParser());

// app.get('/', (req,res) => {
    //     res.send("Welcome to the server!");
    // });
    
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);
app.listen(port, () => {
    dbConnect()
    console.log("listening on port", port);
})