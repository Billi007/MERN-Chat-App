import { useEffect, useState } from "react"
import useConversation from "../../zustand/UseCoversation";
import axios from "axios";
import toast from "react-hot-toast";
import Message from "./Message";

const Messages = () => {
  const [loading, setLoading] = useState(false);
  const {messages, setMessages,selectedConversation} = useConversation();

  useEffect(() => {
    setLoading(true);

    const getMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/messages/${selectedConversation._id}`);
        console.log("get message", response?.data);

        if(response.data.error) throw new Error(response.data.error);
      
        setMessages(response?.data);
        
      } catch (error) {
        console.log("Error fetching message", error.message);
      }
      finally{
        setLoading(false);
      }
    }
    if(selectedConversation?._id) getMessages()
  },[selectedConversation?._id, setMessages])

  return (
    <div className='px-4 flex-1 overflow-auto'>
       
       {!loading && messages.length > 0 && 
        messages.map((message) => (
          <Message key={message._id} message={message} />
         ))}
        

      {loading && messages.length === 0 && (
        <p className="text-white text-center m-auto">Send a message to start the conversation</p>
      )}
   
    </div>
  )
}

export default Messages