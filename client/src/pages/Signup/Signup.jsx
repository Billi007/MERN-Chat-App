import './Signup.css'
import GenderChecker from '../Signup/GenderChecker'
import { Link} from 'react-router-dom'
import { useState } from 'react'
import {useAuthContext} from "../../context/AuthContext"
import toast from 'react-hot-toast'
import { FaUserCircle } from "react-icons/fa";
import axios from 'axios'

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    fullname: "",
    username: "",
    password: "",
    email: "",
    gender: "",
    confirmPassword: "",
  });
  const {setAuthUser} = useAuthContext();

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
      setInputs("")
      
      toast.success("Signup Successfull");
      //localstorage
      localStorage.setItem('chat-app-user', JSON.stringify(response));
      //context
      setAuthUser(response.data);
      

   } catch (error) {
    toast.error("Error signing up")
    console.log(error.message)
   }finally{
    setLoading(false)
   }
    };



  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
    <div className='w-full p-6 rounded-lg shadow-md bg-gray-400  glass bg-opacity-0'>
    <div className="flex justify-center">
         <FaUserCircle className='text-6xl text-white mb-8' />
         </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label className='label p-2 '>
            <span className='text-base label-text font-size'>Full Name</span>
          </label>
          <input
            type='text'
            placeholder='John Doe'
            className='w-full input input-bordered h-10'
            value={inputs.fullname}
            onChange={(e) => setInputs({ ...inputs, fullname: e.target.value })}
          />
        </div>

        <div>
          <label className='label p-2 '>
            <span className='text-base label-text font-size'>Username</span>
          </label>
          <input
            type='text'
            placeholder='johndoe'
            className='w-full input input-bordered h-10'
            value={inputs.username}
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
          />
        </div>

        <div>
          <label className='label p-2 '>
            <span className='text-base label-text font-size'>Email</span>
          </label>
          <input
            type='text'
            placeholder='john@doe'
            className='w-full input input-bordered h-10'
            value={inputs.email}
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
          />
        </div>

        <div>
          <label className='label'>
            <span className='text-base label-text font-size'>Password</span>
          </label>
          <input
            type='password'
            placeholder='Enter Password'
            className='w-full input input-bordered h-10'
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          />
        </div>

        <div>
          <label className='label'>
            <span className='text-base label-text font-size'>Confirm Password</span>
          </label>
          <input
            type='password'
            placeholder='Confirm Password'
            className='w-full input input-bordered h-10'
            value={inputs.confirmPassword}
            onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
          />
        </div>

    {/* checking gender */}

    <GenderChecker onCheckGender = {handleGenderChange} selectGender={inputs.gender} />
    <div>
    </div>

    <Link to='/login' className="font-size hover:underline hover:text-blue-600 mt-2 inline-block">
      Already have a account?
    </Link>
    <button 
    className='btn btn-block btn-sm mt-4 bg-sky-700 rounded-sm hover:bg-sky-800 border-none text-white' 
     disabled={loading}>
			{loading ? <span className='loading loading-spinner '></span> : "Signup"}
		</button>
  </form>
    </div>
  </div>
  )
}

export default Signup
