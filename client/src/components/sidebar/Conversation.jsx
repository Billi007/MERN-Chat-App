import useConversation from "../../zustand/UseCoversation";

const Conversation = ({conversation}) => {

  const {selectedConversation, setSelectedConversation} = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;


  return (
   <>
    <div className={`gap-2 items-center hover:bg-indigo-300 p-2 py-1 cursor-pointer
         ${isSelected ? "bg-sky-600" : ""}
      `}
      onClick={() => setSelectedConversation(conversation)}
      >
     <div className='avatar online'>
        <div className='w-10 rounded-full'>
      <img src= {conversation.url} alt='img' />
        </div>
     </div>

    <div className="flex flex-col flex-1">
      <div className="flex gap-3 justify-between">
      <p className=" text-white">{conversation.fullname} </p>
      <span className="text-xs text-gray-300">10:25</span>
      </div>
    </div>
    </div>


    <div className="divider my-0 py-0 h-1">

    </div>
   </>
  )
}

export default Conversation