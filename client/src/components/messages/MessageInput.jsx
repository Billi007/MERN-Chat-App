/* eslint-disable no-undef */
import { useState } from "react";
import { IoMdSend } from "react-icons/io";
import useConversation from '../../zustand/UseCoversation'
import axios from 'axios'
import toast from 'react-hot-toast'

const MessageInput = () => {
  const [loading, setLoading] = useState("");
  const [message, setMessage] = useState("");
  const {messages, setMessages,selectedConversation} = useConversation();
  const BASE_URL = "http://localhost:5000"

  const handleSubmit = async (e) => {
   e.preventDefault();
   setLoading(true);

   if(!message) return;

   //console.log("selectedConversation ki id", selectedConversation._id);
    try {
      const response = await axios.post(`${BASE_URL}/api/messages/send/${selectedConversation._id}`, {
        message: message,
      }, {withCredentials: true, }
    );
      console.log("send message", response?.data);
      setMessage("");

      if(response.data.error){
        throw new Error(response.data.error)
      }

      setMessages([...messages, response.data]);
    } catch (error) {
      console.log("message ni ja rha hai:: ",error.message)
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
            className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
            placeholder="enter message..."
            />
            <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3">
           {message ?  <IoMdSend className="text-white"/> : ""  }
            </button>
        </div>
    </form>
  )
}



export default MessageInput