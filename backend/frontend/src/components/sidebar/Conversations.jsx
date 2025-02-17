
import Conversation from "./Conversation"
import { useAuthContext } from "../../context/AuthContext"
import useGetConversations from "../../zustand/UseGetConversation"

const Conversations = () => {
  const {loading, conversations} = useGetConversations();
  const {authUser} = useAuthContext();

  return (
    <div className="py-2 flex flex-col overflow-auto">
      <h1 className="px-8 py-2 text-slate-300 font-normal bg-slate-900 ">Messagesssss</h1>
      <h1 className="text-white">{authUser.fullname} </h1>
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