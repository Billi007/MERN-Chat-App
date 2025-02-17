import useConversation from "../../zustand/UseCoversation";
import { useEffect, useRef, useState } from "react"
import axios from "axios";
import Message from "./Message";
import useListenMessages from "./listen-message";

const Messages = () => {
  const [loading, setLoading] = useState(false);
  useListenMessages();
  const {messages, setMessages,selectedConversation} = useConversation();
  const BASE_URL = "https://amazing-bonbon-53c88a.netlify.app";
  const lastMessageRef = useRef();
  
  
  useEffect(() => {
    setLoading(true);
    
    const getMessages = async () => {
      
      if (selectedConversation && selectedConversation._id)  {
        
        try {
          const response = await axios.get(`${BASE_URL}/api/messages/${selectedConversation._id}`,
            {withCredentials: true });
            
            setMessages(response.data);
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
        

      { messages.length === 0 && (
        <div className="mt-52  text-center">
          <p className="text-white">Send a message to start the conversation </p>
        </div>
      )}
   
    </div>
  )
}

export default Messages