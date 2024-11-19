import { useEffect, useState } from "react"
import Conversation from "./Conversation"
import axios from "axios"
const Conversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  //console.log(conversations)


  useEffect(() => {
    const getCoversations = async () => {
      setLoading(true);

    try {
      const response = await axios.get("http://localhost:5000/api/users");
      console.log(response?.data);
      
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
      {
        conversations.map((conversation) => (
       <Conversation key={conversation._id} conversation={conversation} /> 
        ))
      }
     {loading ? <span className="loadin loading-spinner mx-auto"></span> : null}
    </div>
  )
}

export default Conversations