import Sidebar from "../../components/sidebar/Sidebar"
import MessageContainer from '../../components/messages/MessageContainer'
 
const Home = () => {
  return (
    <div className='flex sm:h[500px] h-[600px] overflow-hidden bg-slate-950'>
     <Sidebar/>
     <MessageContainer/>
    </div>
  )
}

export default Home