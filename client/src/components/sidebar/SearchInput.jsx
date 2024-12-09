import { CiSearch } from "react-icons/ci";
import { useState } from "react";
import useConversation from '../../zustand/UseCoversation'
import toast from 'react-hot-toast'
import { useAuthContext } from "../../context/AuthContext"; 

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const {setSelectedConversation} = useConversation();
  const {authUser} = useAuthContext();

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(!search) return;

    if(search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }
    
    const conversation = authUser.find((convo) => convo.user.fullname.toLowerCase().includes(search.toLowerCase()))
    if(conversation){
      setSelectedConversation(conversation);
      setSearch("")
    }else toast.error("No such user found!");
  }

  return (
   <>
   <div className=" h-[5vh]">
      <div className="px-4 py-4">
        <form onSubmit={handleSubmit}>
          <div className="flex space-x-3">
            <label className=" border-[1px] border-gray-700 bg-slate-900 rounded-full p-3 flex items-center w-full">
              <input
                type="text"
                className="grow outline-none  bg-transparent w-full text-white"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button>
              <CiSearch className="text-xl hover:bg-gray-600 rounded-full duration-300 text-white" />
            </button>
            </label>
            
          </div>
        </form>
      </div>
    </div>
   </>
  )
}

export default SearchInput