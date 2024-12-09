import './message.css'
import MessageInput from "./MessageInput"
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import useConversation from '../../zustand/UseCoversation'
//import { useState } from "react"
import { useAuthContext } from "../../context/AuthContext";
import { UseSocketContext } from "../../context/SocketContext";
import { useEffect } from 'react';
//import toast from "react-hot-toast";

const MessageContainer = () => {
  //const [searchMessage, setSearchMessage] = useState("")
  const {selectedConversation, setSelectedConversation} = useConversation();
  const {onlineUsers} = UseSocketContext();
  //const {message} = useConversation();

 const getOnlineStatus = (userId) => {
  return onlineUsers.includes(userId) ? "online" : "offline";
 };

 useEffect(() => {
  // cleanup function (unmounts)
  return () => setSelectedConversation(null);
}, [setSelectedConversation]);

  return (
  
     <div className='md:min-w-[760px] max-w-[750px] flex flex-col overflow-auto '>
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
      <span className='text-white font-medium ml-3'> {selectedConversation.fullname} </span>
      <p className="text-xs text-gray-400 ml-5">
       {getOnlineStatus(selectedConversation._id)} 
      </p>
      {/* <form onSubmit={handleSerchMessage}>
       <input 
       type="text"
       value={searchMessage}
       onChange={e => setSearchMessage(e.target.value)}
        />
        <button>Search</button>
      </form> */}
       
           </div>

             <div
              className=" flex-auto overflow-y-auto"
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
				<p>Welcome 👋 {authUser.user?.fullname}  ❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};

