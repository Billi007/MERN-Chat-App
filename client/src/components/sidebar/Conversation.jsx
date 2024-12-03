import useConversation from "../../zustand/UseCoversation";
import { UseSocketContext } from "../../context/SocketContext";
const Conversation = ({conversation}) => {

  const {selectedConversation, setSelectedConversation} = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;
  const {onlineUsers} = UseSocketContext();
  const isOnline =  onlineUsers.includes(conversation._id);


  return (
   <>
    <div className={`hover:bg-slate-600 duration-300 cursor-pointer text-white
         ${isSelected ? "bg-slate-700" : ""}
      `}
      onClick={() => setSelectedConversation(conversation)}>
    <div className="flex space-x-4 px-8 py-3 hover:bg-slate-700 duration-300
     cursor-pointer">
       
        <div className={`avatar ${isOnline ? "online" : ""} `}>
          <div className="w-8 rounded-full">
            <img src={conversation. profilePicture} />
          </div>
          
        </div>
        <div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='text-white'>{conversation.fullname}</p>
					</div>
				</div>

      </div>
    </div>
    <div className="divider my-0 py-0 h-1"></div>
   </>
  )
}

export default Conversation