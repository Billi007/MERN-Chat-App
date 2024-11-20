import {useAuthContext} from '../../context/AuthContext'
//import useConversation from '../../zustand/UseCoversation';
const Message = ({message}) => {
 const {authUser} = useAuthContext();
 //const {selectedConversation} = useConversation();
 const fromMe = message.senderId === authUser._id;
 const chatClassName = fromMe ? "chat-end" : "chat-start";
 const MessageBgColor = fromMe ? "bg-sky-500" : "";


 function extractTime(dateString) {
 const date = new Date(dateString);
 const hours = padZero(date.getHours());
 const minutes = padZero(date.getMinutes());
 return `${hours} ${minutes}`;
 }

  function padZero(number) {
    return number.toString().pasStart(2, "0")
  }
  return (
    <div className= {`chat ${chatClassName}`}>
   <div className="chat-image avatar">
 <div className="w-10 rounded-full">
 <img 
 src="" 
 alt="" />
 </div>
   </div>

   <div className={`chat-bubble text-white ${MessageBgColor}`}>{message.message} </div>
   <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">{extractTime} </div>
    </div>
  )
}

export default Message