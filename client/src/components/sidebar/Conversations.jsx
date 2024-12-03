import { useEffect, useState } from "react"
import Conversation from "./Conversation"
import axios from "axios"
import { useAuthContext } from "../../context/AuthContext"
const Conversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
 //const BASE_URL = "http://localhost:5000";
 const {authUser} = useAuthContext();
  
  useEffect(() => {
    const getCoversations = async () => {
      setLoading(true);

    try {
      const response = await axios.get('http://localhost:5000/api/users',
        {withCredentials: true}
      );
  
      
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
      <h1 className="text-white">{authUser.user.fullname} </h1>
      <div className="py-2 flex-1 overflow-y-auto"
      style={{ maxHeight: "calc(84vh - 10vh)" }}>
      
      { conversations.map((conversation, idx) => (
       <Conversation 
       key={conversation._id} 
       conversation={conversation}
       lastIdx={idx === conversations.length - 1 }
       /> 
      ))}
     {loading ? <span className="loadin loading-spinner mx-auto"></span> : null}
      </div>
    </div>
  )
}

export default Conversations