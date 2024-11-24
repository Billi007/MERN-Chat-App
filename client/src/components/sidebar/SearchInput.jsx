import { useState } from "react";
import { CiSearch } from "react-icons/ci";
//import useConversation from '../../zustand/UseCoversation'
//import toast from 'react-hot-toast'

const SearchInput = () => {
  const [search, setSearch] = useState("");
  //const { setSelectedConversation } = useConversation();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!search) return;
  //   const conversation = allUsers.find((user) =>
  //     user.fullname?.toLowerCase().includes(search.toLowerCase())
  //   );
  //   if (conversation) {
  //     setSelectedConversation(conversation);
  //     setSearch("");
  //   } else {
  //     toast.error("User not found");
  //   }
  // };

  return (
   <>
   <div className=" h-[5vh]">
      <div className="px-6 py-4">
        <form >
          <div className="flex space-x-3">
            <label className=" border-[1px] border-gray-700 bg-slate-900 rounded-md p-3 flex items-center gap-1 w-[90%]">
              <input
                type="text"
                className="grow outline-none bg-transparent w-full text-white"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
            <button>
              <CiSearch className="text-5xl p-2 hover:bg-gray-600 rounded-full duration-300 text-white" />
            </button>
          </div>
        </form>
      </div>
    </div>
   </>
  )
}

export default SearchInput