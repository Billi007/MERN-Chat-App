import express from "express";
import dotenv from 'dotenv'
import path from 'path';
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


if(process.env.NODE_ENV === 'production'){
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '/frontend/dist')))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '.frontend', 'dist', 'index.html'))
    })
    
}

server.listen(port, () => {
    dbConnect()
    console.log("listening on port", port);
});