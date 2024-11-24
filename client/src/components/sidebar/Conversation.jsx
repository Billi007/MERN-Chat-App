import useConversation from "../../zustand/UseCoversation";

const Conversation = ({conversation}) => {

  const {selectedConversation, setSelectedConversation} = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;
  


  return (
   <>
    <div className={`hover:bg-slate-600 duration-300 cursor-pointer text-white
         ${isSelected ? "bg-slate-700" : ""}
      `}
      onClick={() => setSelectedConversation(conversation)}>
    <div className="flex space-x-4 px-8 py-3 hover:bg-slate-700 duration-300
     cursor-pointer">
       
        <div className={`avatar`}>
          <div className="w-8 rounded-full">
            <img src="https://img.freepik.com/premium-vector/man-women-different-avatars-illustration-vector-art-design_666656-112.jpg" alt="dp" />
          </div>
          
        </div>
        <div>
          <h1 className="font-normal">{conversation.fullname}</h1>
        </div>

      </div>
    </div>
    <div className="divider my-0 py-0 h-1"></div>
   </>
  )
}

export default Conversation