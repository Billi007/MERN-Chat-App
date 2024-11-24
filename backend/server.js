import express from "express";
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route.js'
import dbConnect from "./db/dbConnection.js";
import messageRoutes from './routes/message.route.js'
import cookieParser from "cookie-parser";
import { server, app } from "./SocketIO/socket.js";
import userRoutes from './routes/user.route.js'
import cors from 'cors'

const port = process.env.PORT || 5000;

dotenv.config();
app.use(express.json()); // to pasrse incoming routes with JSON payload(from req.body)
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:8000", // allow requests from the React app
    credentials: true, // allow cookies to be sent back to the client
    
}));
    
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);
server.listen(port, () => {
    dbConnect()
    console.log("listening on port", port);
});