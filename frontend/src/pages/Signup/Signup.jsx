import './Signup.css'
import GenderChecker from '../Signup/GenderChecker'
import { Link} from 'react-router-dom'
import { useState } from 'react'
import {useAuthContext} from "../../context/AuthContext"
import toast from 'react-hot-toast'
import { FaUserCircle } from "react-icons/fa";
import axios from 'axios'
import { useForm } from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import signupSchema from '../../schema/signup'

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const {setAuthUser} = useAuthContext();
  const BASE_URL = "http://localhost:5000";


  const {handleSubmit, register, setValue, formState: { errors }} = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
      fullname: "",
      gender: ""
    },
    resolver: yupResolver(signupSchema)
  })

  const onsubmit = async (data) => {
    setLoading(true);

    try {
    
      const response = await axios.post(`${BASE_URL}/api/auth/signup`, 
        {...data },
        {withCredentials:true} );
      
      toast.success("Signup Successfull");
      //localstorage
      localStorage.setItem('chat-app-user', JSON.stringify(response.data));
      //context
      setAuthUser(response.data);
      

   } catch (error) {
    toast.error("Error signing up")
    console.log(error.message)
   }finally{
    setLoading(false)
   }
    };

    const handleGenderChange = (gender) => {
      setValue('gender', gender);
    }

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
    <div className='w-full p-6 rounded-lg shadow-md bg-gray-400  glass bg-opacity-0'>
    <div className="flex justify-center">
         <FaUserCircle className='text-6xl text-white mb-8' />
         </div>

      <form onSubmit={handleSubmit(onsubmit)}>
        <div>
          <label className='label p-1 '>
            <span className='text-base label-text font-size'>fullname</span>
          </label>
          <input
          {...register("fullname")}
            type='text'
            placeholder='John Doe'
            className='w-full input input-bordered h-10'
          />
          {errors.fullname && (
              <p className="text-red-500 text-sm">{errors.fullname.message}</p>
            )}
        </div>

        <div>
          <label className='label p-1 '>
            <span className='text-base label-text font-size'>Username</span>
          </label>
          <input
          {...register("username")}
            type='text'
            placeholder='johndoe'
            className='w-full input input-bordered h-10'
          />
          {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
        </div>

        <div>
          <label className='label p-1 '>
            <span className='text-base label-text font-size'>Email</span>
          </label>
          <input
          {...register("email")}
            type='text'
            placeholder='john@doe'
            className='w-full input input-bordered h-10' 
          />
           {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
        </div>

        <div>
          <label className='label'>
            <span className='text-base label-text font-size'>Password</span>
          </label>
          <input
          {...register("password")}
            type='password'
            placeholder='Enter Password'
            className='w-full input input-bordered h-10' 
          />
           {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
        </div>

        <div>
          <label className='label p-1'>
            <span className='text-base label-text font-size'>Confirm Password</span>
          </label>
          <input
          {...register("confirmPassword")}
            type='password'
            placeholder='Confirm Password'
            className='w-full input input-bordered h-10' 
          />
           {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
            )}
        </div>

    {/* checking gender */}

    <GenderChecker onCheckGender = {handleGenderChange} selectGender={signupSchema.gender} />
    <div>
    </div>

    <Link to='/login' className="font-size hover:underline hover:text-blue-600 mt-2 inline-block">
      Already have a account?
    </Link>
    <button 
    type='submit'
    className='btn btn-block btn-sm mt-4 bg-sky-700 rounded-md hover:bg-sky-800 border-none text-white' 
     disabled={loading}>
			{loading ? <span className='loading loading-spinner font-thin'></span> : "Signup"}
		</button>
  </form>
    </div>
  </div>
  )
}

export default Signup
