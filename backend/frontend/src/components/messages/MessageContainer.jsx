import MessageInput from "./MessageInput"
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import useConversation from '../../zustand/UseCoversation'
import { useAuthContext } from "../../context/AuthContext";
import { UseSocketContext } from "../../context/SocketContext";
import { useEffect } from 'react';

const MessageContainer = () => {
  const {selectedConversation, setSelectedConversation} = useConversation();
  const {onlineUsers} = UseSocketContext();

 const getOnlineStatus = (userId) => {
  return onlineUsers.includes(userId) ? "online" : "offline";
 };

 useEffect(() => {
  // cleanup function (unmounts)
  return () => setSelectedConversation(null);
}, [setSelectedConversation]);

  return (
  
     <div className='md:w-[600px] md:min-w-[500px] flex flex-col overflow-auto '>
      {!selectedConversation ? (
     <NoChatSelected />
      ): (
        
        <>
    {/* Header */}

       
   <div className='bg-slate-800 flex flex-col px-2 py-2 mb-2 justify-start items-start overflow-y-auto'>
      <span className='text-white text-sm font-medium ml-3'> {selectedConversation.fullname} </span>
      <p className="text-xs text-gray-400 ml-5 mt-1">
       {getOnlineStatus(selectedConversation._id)} 
      </p>
       
           </div>

             <div
              className=" flex-auto overflow-y-auto "
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
			<div className='px-4 text-center  md:block hidden sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 {authUser.user?.fullname}  ❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};

