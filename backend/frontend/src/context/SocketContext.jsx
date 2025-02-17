import {useAuthContext} from './AuthContext'
import { createContext, useContext, useEffect, useState } from "react";
import io from 'socket.io-client'
const SocketContext = createContext();

export const UseSocketContext = () => {
    return useContext(SocketContext);
  };
  

export const SocketProvider = function({children}) {

const [socket, setSocket] = useState(null);
const [onlineUsers, setOnlineUsers] = useState([]);
const {authUser} = useAuthContext();

useEffect(() => {
    if(authUser){
       const socket = io('https://amazing-bonbon-53c88a.netlify.app', {
       query: {
        userId : authUser.user?._id
       }});
       setSocket(socket);

       socket.on('getOnlineUsers', (users) => {
        setOnlineUsers(users);
       });

       //cleanup funtcion if the user is not verified.
       return () => socket.close();  
    } else {
        if(socket){
            socket.close();
            setSocket(null);
        }
    }
},[authUser]);

return (
    <SocketContext.Provider value={{socket, onlineUsers}}>
        {children}
    </SocketContext.Provider>
  );
}

export default SocketContext