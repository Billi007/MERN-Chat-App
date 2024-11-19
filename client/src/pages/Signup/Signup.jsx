
import GenderChecker from '../Signup/GenderChecker'
import { Link} from 'react-router-dom'
import { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [authUser, setAuthUser] = useState();
  const [inputs, setInputs] = useState({
    fullname: "",
    username: "",
    password: "",
    email: "",
    gender: "",
    confirmPassword: "",
  });
  
  const handleGenderChange = (gender) => {
    setInputs({...inputs, gender});
  }

  const hanldeInputErrors = ({fullname,email,username,password, confirmPassword, gender}) => {
    if(!fullname || !username || !password || !confirmPassword || !gender || !email){
      toast.error("All fields are required!")
      return false;
    }

    if(password !== confirmPassword){
    toast.error("Password don't match!");
   }

   if(password.length < 6){
    toast.error("Password should be at least 6 characters long!")
    return false;
   }
   return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {fullname, username,email, password, confirmPassword, gender} = inputs;
    const success = hanldeInputErrors({fullname,email,username,password, confirmPassword, gender});
    if( !success) return;
    setLoading(true);
    
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        username,
        email,
        password,
        confirmPassword,
        gender,
        fullname
      });
      toast.success("Signup Successful!");
      console.log(response.data)
      

      //localstorage
      localStorage.setItem('chat-app-user', JSON.stringify(response));
      //context
      setAuthUser(response);


   } catch (error) {
    toast.error("Error signing up")
    console.log(error.message)
   }finally{
    setLoading(false)
   }
   return {loading, authUser}
    };



  return (
    <div className= "flex flex-col m-auto items-center min-w-80 justify-center w-[400px] bg-[#272757]">
    <div className="w-full p-6 rounded-md shadow-md bg-clip-padding backdrop-filter
    backdrop-blur-lg bg-opacity-0">
    
    <div className="flex items-center justify-center text-white text-3xl font-semibold text-center gap-2">
    <h1 className='heading text-3xl font-semibold '>Signup</h1>
    <h1 className="text-[#bfbfff] " >Chatty</h1>
    </div>
  <form onSubmit={handleSubmit}>

  <div>
      <label className="label p-2 ">
        <span className="text-base label-text text-white">Fullname</span>
      </label>
       <input 
      type="text" 
      placeholder="Enter your fullname"
      className="w-full input-bordered h-10 rounded-sm p-2"
      value={inputs.fullname}
      onChange={e => setInputs({...inputs, fullname: e.target.value})}
      />
    </div>

    <div>
      <label className="label p-2 ">
        <span className="text-base label-text text-white">Username</span>
      </label>
       <input 
       value={inputs.username}
       onChange={e => setInputs({...inputs, username: e.target.value})}
      type="text" 
      placeholder="Enter your username"
      className="w-full input-bordered h-10 rounded-sm p-2"
      />
    </div>

    <div>
      <label className="label p-2 ">
        <span className="text-base label-text text-white">Email</span>
      </label>
       <input 
       value={inputs.email}
       onChange={e => setInputs({...inputs, email: e.target.value})}
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
       value={inputs.password}
       onChange={e => setInputs({...inputs, password: e.target.value})}
      type="text" 
      placeholder="Enter password"
      className="w-full input-bordered h-10 rounded-sm p-2"
      />
    </div>
    <div>
      <label className="label p-2  text-white">
        <span className="text-base label-text text-white">Confirm password</span>
      </label>
       <input 
       value={inputs.confirmPassword}
       onChange={e => setInputs({...inputs, confirmPassword: e.target.value})}
      type="text" 
      placeholder="Enter password"
      className="w-full input-bordered h-10 rounded-sm p-2"
      />
    </div>

    {/* checking gender */}

    <GenderChecker onCheckGender = {handleGenderChange} selectGender={inputs.gender} />
    <div>
    </div>

    <Link to='/login' className="text-sm text-white hover:underline hover:text-blue-600 mt-2 inline-block">
      Already have a account?
    </Link>
  <button 
  disabled={loading}
  className="btn btn-block btn-sm mt-2 rounded-sm">
    {loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
  </button>
  </form>
    </div>
  </div>
  )
}

export default Signup
