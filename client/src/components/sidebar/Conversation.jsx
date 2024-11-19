
const Conversation = ({conversation}) => {
  return (
   <>
    <div className='gap-2 items-center hover:bg-indigo-300 p-2 py-1 cursor-pointer'>
     <div className='avatar online'>
        <div className='w-10 rounded-full'>
      <img src= {conversation.url} alt='img' />
        </div>
     </div>

    <div className="flex flex-col flex-1">
      <div className="flex gap-3 justify-between">
      <p className=" text-white">{conversation.fullname} </p>
      <span className="text-xl">😋</span>
      </div>
    </div>
    </div>


    <div className="divider my-0 py-0 h-1">

    </div>
   </>
  )
}

export default Conversation