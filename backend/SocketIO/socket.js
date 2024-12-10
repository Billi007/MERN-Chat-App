import {Server} from 'socket.io'
import {createServer} from 'http'
import express from 'express'

const app = express();
const server = createServer(app);
const io = new Server(server,{
    cors: {
        origin: 'http://localhost:8000',
        methods: ['GET', 'POST']
    }
});

export const getReceiverSocketId = (receiverId) => {
 return users[receiverId];
}

const users = {}
//ScoketIO
io.on("connection", (socket) => {
    console.log("new user connected! " + socket.id);

    const userid = socket.handshake.query.userId;
    if(userid != 'undefined') {
    users[userid] = socket.id;
    }

    //creating a new event to check if user is online
    io.emit("getOnlineUsers", Object.keys(users))


    socket.on("disconnect", () => {
        console.log("user disconnected! " + socket.id);
        delete users[userid];
        io.emit("getOnlineUsers", Object.keys(users))
    })
});


export {app, io, server}