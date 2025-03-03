import MessageContainer from '../../components/messages/MessageContainer.jsx'
import Sidebar from "../../components/sidebar/Sidebar"

const Home = () => {
  return (
    <div className='flex sm:h[500px] h-[600px] overflow-hidden bg-slate-950'>
     <Sidebar/>
     <MessageContainer/>
    </div>
  )
}

export default Home