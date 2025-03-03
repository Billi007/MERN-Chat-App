import SearchInput from './SearchInput'
import Conversations from './Conversations'
import LogoutBtn from './LogoutBtn'
const Sidebar = () => {
  return (
    <div className='border-r flex flex-col bg-black'>
    <SearchInput/>
    <div className='divider px-3'></div>
    <Conversations/>
    <LogoutBtn/>
    </div>
  )
}

export default Sidebar