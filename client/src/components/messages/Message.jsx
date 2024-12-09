//import {useAuthContext} from '../../context/AuthContext'

import { useAuthContext } from "../../context/AuthContext";

const Message = ({message}) => {
  //const {selectedConversation} = useConversation();
  const {authUser} = useAuthContext();
  //console.log("message ka authUser: " + authUser)
 const fromMe = message.senderId === authUser.user._id;
 const chatClassName = fromMe ? "chat-end" : "chat-start";
 const MessageBgColor = fromMe ? "bg-[#2e1065]" : "bg-[#1e1b4b]";
 //const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;


 const createdAt = new Date(message.createdAt);
 const formattedTime = createdAt.toLocaleTimeString([], {
   hour: "2-digit",
   minute: "2-digit",
 }); 

  return (
 <div>
   <div className='p-1 '>
   <div className={`flex flex-col chat ${chatClassName}`}>

		
     <div className={`chat-bubble chat text-white text-sm ${MessageBgColor}`}>{message.message} </div>
     <div className='text-gray-700 text-xs '>{formattedTime} </div>
   </div>
  </div>

 </div>
  )
}

export default Message