import { useState } from "react";
import { IoIosSend } from "react-icons/io";
import useConversation from '../../zustand/UseCoversation'
import axios from 'axios'
import toast from 'react-hot-toast'

const MessageInput = () => {
  const [loading, setLoading] = useState("");
  const [message, setMessage] = useState("");
  const {messages, setMessages,selectedConversation} = useConversation();
  const BASE_URL = "https://amazing-bonbon-53c88a.netlify.app"

  const handleSubmit = async (e) => {
   e.preventDefault();
   setLoading(true);

   if(!message) return;

    try {
      const response = await axios.post(`${BASE_URL}/api/messages/send/${selectedConversation._id}`, {
        message: message,
      }, {withCredentials: true, }
    );
      setMessage("");

      if(response.data.error){
        throw new Error(response.data.error)
      }

      setMessages([...messages, response.data]);
    } catch (error) {
      console.log(error.message)
      toast.error("Failed to send message")
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="px-4 my-3" >
        <div className="w-full relative">
            <input 
            value={message}
            onChange={e => setMessage(e.target.value)}
            type="text"
            className="border text-sm rounded-lg block w-full p-2.5 bg-slate-700 border-gray-600 text-white"
            placeholder="enter message..."
            />
            <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3">
           {message ?  <IoIosSend className="text-white text-xl "/> : ""  }
            </button>
        </div>
    </form>
  )
}



export default MessageInput