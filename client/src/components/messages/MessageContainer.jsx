import MessageInput from "./MessageInput"
import './message.css'
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import useConversation from '../../zustand/UseCoversation'
import { useEffect } from "react"
import { useAuthContext } from "../../context/AuthContext";
import { UseSocketContext } from "../../context/SocketContext";

const MessageContainer = () => {
  const {selectedConversation, setSelectedConversation} = useConversation();
  const {onlineUsers} = UseSocketContext();

 const getOnlineStatus = (userId) => {
  return onlineUsers.includes(userId) ? "online" : "offline";
 }
  //Cleanup function
  useEffect(() => {
    // cleanup function (unmounts)
   return() => setSelectedConversation(null);
  },[setSelectedConversation]);
 

  return (
  
     <div className='md:min-w-[450px] max-w-[600px] flex flex-col overflow-auto '>
      {!selectedConversation ? (
     <NoChatSelected />
      ): (
        
        <>
    {/* Header */}

       
   <div className='bg-slate-700 flex flex-col px-2 py-2 mb-2 justify-start items-start overflow-y-auto'>
    {/* <div className={`avatar `}> 
          <div className="w-10 rounded-full">
            <img src={profilePicture}/>
          </div>
        </div> */}
      <span className='text-white font-medium '> {selectedConversation.fullname} </span>
      <p className="text-xs text-gray-400">
       {getOnlineStatus(selectedConversation._id)} 
      </p>
           </div>

             <div
              className=" flex-1 overflow-y-auto"
              style={{ maxHeight: "calc(79vh - 18vh)" }}
              >
              <Messages />  
            </div>    
            <MessageInput />

    </>
      )}
    </div>
  )
}

export default MessageContainer

const NoChatSelected = () => {
//const authUser = JSON.parse(localStorage.getItem("chat-app-user"));
const {authUser} = useAuthContext();

	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 {authUser.user.fullname}  ❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};

