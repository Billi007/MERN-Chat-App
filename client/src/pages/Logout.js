import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogout = () => {
    const [loading, setLoadig] = useState(false);
    const {setAuthUser} = useAuthContext()

   const Logout = async () => {
    setLoadig(true);
    try {
        const response = await axios.post('http://localhost:5000/api/auth/logout');
        toast.success("User logged out successfully!")

        if(response.data.error){
            throw new Error(response.data.error);
        }

        localStorage.removeItem('chat-app-user');
        setAuthUser(null);
    } catch (error) {
        toast.error("Failed to log out. Please try again!")
        console.log(error.message)
    }
    finally{
   setLoadig(false)
    }
   }
   return {loading, Logout}
}
export default useLogout;