// import '../../App.css'
import { useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuthContext } from "../../context/AuthContext"
const Login = () => {
  const [loading,setLoading] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const {setAuthUser} = useAuthContext();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const {email, password} = data;
      if(!email || !password) { 
        toast.error("All fields are required!")
        

        if(password.length <= 6){
          toast.error("Password must be at least 6 characters");
        }
        return false;
      }
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      })
      if(response.statusCode === 200){
        toast.success("Logged in successfully");
      }
      console.log(response);

      localStorage.setItem('chat-app-user', response);
      setAuthUser(response);

    } catch (error) {
      toast.error("Error while Logging in",error.message);
      console.log(error.message)
    }

    finally{
      setLoading(false);
    }
  }

  return (
    <div className= "flex flex-col items-center min-w-80 justify-center w-[400px]">
      <div className="w-full p-6 rounded-md shadow-md bg-gray-400 bg-clip-padding backdrop-filter
      backdrop-blur-lg bg-opacity-0">
      
      <div className="flex items-center justify-center text-white text-3xl font-semibold text-center gap-2">
      <h1 className='heading text-3xl font-semibold '>Login</h1>
      <h1 className="text-[#bfbfff] " >Chatty</h1>
      </div>
    <form onSubmit={handleSubmit}>

      <div>
        <label className="label p-2 ">
          <span className="text-base label-text text-white">Email</span>
        </label>
         <input 
         value={data.email}
         onChange={e => setData({...data, email: e.target.value})}
        type="text" 
        placeholder="Enter your email"
        className="w-full input-bordered h-10 rounded-sm p-2"
        />
      </div>

      <div>
        <label className="label p-2  text-white">
          <span className="text-base label-text text-white">Password</span>
        </label>
         <input 
         value={data.password}
         onChange={e => setData({...data, password: e.target.value})}
        type="text" 
        placeholder="Enter password"
        className="w-full input-bordered h-10 rounded-sm p-2"
        />
      </div>

      <Link to='/signup' className="text-sm text-white hover:underline hover:text-blue-600 mt-2 inline-block">
        {"Don't"} have an account?
      </Link>
    <button 
    disabled={loading}
    className="btn btn-block btn-sm mt-2 rounded-sm">
    {loading ? <span className="loading loading-spinner"/> : "Login"}
    </button>
    </form>
      </div>
    </div>
  )
}

export default Login


//Starter code of login

// const Login = () => {
//   return (
//     <div className= "flex flex-col items-center min-w-80 justify-center w-[400px]">
//       <div className="w-full p-6 rounded-md shadow-md bg-gray-400 bg-clip-padding backdrop-filter
//       backdrop-blur-lg bg-opacity-0">
      
//       <div className="flex items-center justify-center text-white text-3xl font-semibold text-center gap-2">
//       <h1 className='heading text-3xl font-semibold '>Login</h1>
//       <h1 className="text-[#bfbfff] " >Chatty</h1>
//       </div>
//     <form>

//       <div>
//         <label className="label p-2 ">
//           <span className="text-base label-text text-white">Username</span>
//         </label>
//          <input 
//         type="text" 
//         placeholder="Enter your username"
//         className="w-full input-bordered h-10 rounded-sm p-2"
//         />
//       </div>

//       <div>
//         <label className="label p-2  text-white">
//           <span className="text-base label-text text-white">Password</span>
//         </label>
//          <input 
//         type="text" 
//         placeholder="Enter password"
//         className="w-full input-bordered h-10 rounded-sm p-2"
//         />
//       </div>

//       <a href="#" className="text-sm text-white hover:underline hover:text-blue-600 mt-2 inline-block">
//         {"Don't"} have an account?
//       </a>
//     <button className="btn btn-block btn-sm mt-2 rounded-sm">Login</button>
//     </form>
//       </div>
//     </div>
//   )
// }


