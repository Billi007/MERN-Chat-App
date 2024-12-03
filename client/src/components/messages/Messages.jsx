import { useEffect, useRef, useState } from "react"
import useConversation from "../../zustand/UseCoversation";
import axios from "axios";
import Message from "./Message";
import useListenMessages from "./listen-message";

const Messages = () => {
  const [loading, setLoading] = useState(false);
  const {messages, setMessages,selectedConversation} = useConversation();
  const BASE_URL = "http://localhost:5000";
  const lastMessageRef = useRef();
  
  
  useEffect(() => {
    setLoading(true);
    
    const getMessages = async () => {
      
      if (selectedConversation && selectedConversation._id)  {
        
        try {
          const response = await axios.get(`${BASE_URL}/api/messages/${selectedConversation._id}`,
            {withCredentials: true });
            
            setMessages(response.data);
            console.log("get message", response?.data);
                 
          } catch (error) {
            console.log("Error fetching message", error.message);
          }
          finally{
            setLoading(false);
          }
        }
      }
      getMessages();
    },[selectedConversation, setMessages]);

    //listening messages from socket.io server
    useListenMessages();

  useEffect(() => {
    setTimeout(() => {
      if(lastMessageRef .current){
        lastMessageRef .current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  },[messages]);


  return (
    <div className='px-4 flex-1 overflow-y-auto text-white '>
       {!loading 
       && messages.length > 0 && 
        messages.map((message) => (
         <div key={message._id}  ref={lastMessageRef}>
           <Message message={message} />
         </div>
         ))}
        

      {loading && messages.length === 0 && (
        <p className="text-white text-center m-auto">Send a message to start the conversation!</p>
      )}
   
    </div>
  )
}

export default Messages