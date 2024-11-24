import {useAuthContext} from '../../context/AuthContext'
//import useConversation from '../../zustand/UseCoversation';
const Message = ({message}) => {
//console.log(message)
 const {authUser} = useAuthContext();
 //const {selectedConversation} = useConversation();
 const fromMe = message.senderId === authUser._id;
 const chatClassName = fromMe ? "chat-start" : "chat-end";
 const MessageBgColor = fromMe ? "" : "bg-sky-600";


 const createdAt = new Date(message.createdAt);
 const formattedTime = createdAt.toLocaleTimeString([], {
   hour: "2-digit",
   minute: "2-digit",
 });

  return (
  <div className='p-2 '>
   <div className={`flex flex-col chat ${chatClassName}`}>
     <div className={`chat-bubble text-white text-sm ${MessageBgColor}`}>{message.message} </div>
     <p className='text-gray-700 text-xs '>{formattedTime} </p>
   </div>

   <div className='chat chat-start'></div>
  </div>
  )
}

export default Message