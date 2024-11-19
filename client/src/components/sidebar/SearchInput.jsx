import { CiSearch } from "react-icons/ci";

const SearchInput = () => {
  return (
   <>
   <form className='flex gap-2 items-center justify-center'>
    <input type="text" 
    placeholder='Search...' 
    className='w-full p-2 input-bordered rounded-full'/>
     <button type='submit' className='btn btn-circle bg-sky-500 border-none text-white font-bold text-2xl'>
     <CiSearch />
        </button>
   </form>
   </>
  )
}

export default SearchInput