import { useEffect, useState } from "react"
import Conversation from "./Conversation"
import axios from "axios"

const Conversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const BASE_URL = "http://localhost:5000";
  
  useEffect(() => {
    const getCoversations = async () => {
      setLoading(true);

    try {
      const response = await axios.get(`${BASE_URL}/api/users`);
  
      
      if(response.data.error){
        throw new Error(response.data.error)
      }
      
      setConversations(response.data);

    } catch (error) {
      console.log(error.message)
    }
    finally {
      setLoading(false);
    }
  }
    getCoversations();
  },[])


  return (
    <div className="py-2 flex flex-col overflow-auto">
      <h1 className="px-8 py-2 text-white font-semibold bg-slate-800 rounded-md">Messages</h1>
      <div className="py-2 flex-1 overflow-y-auto"
      style={{ maxHeight: "calc(84vh - 10vh)" }}>
      
      { conversations.map((conversation) => (
       <Conversation key={conversation._id} conversation={conversation} /> 
      ))}
     {loading ? <span className="loadin loading-spinner mx-auto"></span> : null}
      </div>
    </div>
  )
}

export default Conversations