import { createContext, useContext, useEffect, useState } from "react";
import {useAuthContext} from './AuthContext'
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
       const socket = io('http://localhost:5000', {
       query: {
        userId : authUser?.user._id
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