import { CiLogout } from "react-icons/ci";
import useLogout from "../../pages/Logout";

const LogoutBtn = () => {
  const {loading, Logout} = useLogout();
  return (
    <div className='mt-auto'>
   {!loading ? (
    <CiLogout onClick={Logout} className="w-6 h-6 text-white cursor-pointer" />
   ) : (
    <span className="loading loading-spinner"></span>
   )}
    </div>
  )
}

export default LogoutBtn