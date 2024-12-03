import { CiLogout } from "react-icons/ci";
import useLogout from "../../pages/Logout";

const LogoutBtn = () => {
  const {loading, Logout} = useLogout();
  return (
    <div className='m-2 mt-8'>
   {!loading ? (
  <>
   {/* You can open the modal using document.getElementById('ID').showModal() method */}
<CiLogout className="text-white cursor-pointer " onClick={()=>document.getElementById('my_modal').showModal()}>logout</CiLogout>
<dialog id="my_modal" className="modal">
  <div className="modal-box">
    <form method="dialog">
      <button className="btn btn-sm btn-circle border-none absolute right-2 top-2 ">✕</button>
    </form>
    <p className="py-4 mb-4">Do your really want to logout?</p>
  <button className="btn btn-sm" onClick={Logout}>Yes</button>
  </div>
</dialog>
  </>
   ) : (
    <span className="loading loading-spinner"></span>
   )}
    </div>
  )
}

export default LogoutBtn
