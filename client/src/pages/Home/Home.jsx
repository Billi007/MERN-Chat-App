import Sidebar from "../../components/sidebar/Sidebar"
import MessageContainer from '../../components/messages/MessageContainer'
 
const Home = () => {
  return (
    <div className='flex sm:h[600px] overflow-hidden'>
     <Sidebar/>
     <MessageContainer/>
    </div>
  )
}

export default Home