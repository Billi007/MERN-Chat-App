import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";
import { useForm } from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import signInSchema from "../../schema/signin";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const BASE_URL = "https://amazing-bonbon-53c88a.netlify.app";

  const { handleSubmit, register, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(signInSchema),
  });
  
  const onsubmit = async (data) => {
    setLoading(true)

    try {
      

      // API call to login user
      const response = await axios.post(`${BASE_URL}/api/auth/login`,
        {
        email: data.email,
        password: data.password,
        },
        { withCredentials: true }
      );

      if (response.status == 201) {
        toast.success("Logged in successfully");
      }

      localStorage.setItem("chat-app-user",JSON.stringify(response.data));
      setAuthUser(response.data);
    } catch (error) {
      toast.error("Error while Logging in", error.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-w-80 mx-auto">
    <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 glass bg-opacity-0">
      <div className="flex justify-center">
        <FaUserCircle className="text-6xl text-white mb-8" />
      </div>

      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="my-5">
          <label className="input input-bordered flex items-center gap-2">
            <input
              {...register("email")}
              type="email"
              className="grow"
              placeholder="Email"
            />
          </label>
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="input input-bordered flex items-center gap-2">
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="grow"
            />
          </label>
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}
        </div>

         <button  className="text-xs mt-2 inline-block text-white">
          {"don't"} have an account? <Link to={'/signup'} className="hover:text-sky-600 font-bold" >Sign up now</Link>
          </button>

        <div>
          <button
            className="btn btn-block btn-sm mt-4 bg-sky-700 rounded-sm hover:bg-sky-800 border-none text-white"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <div className="font-medium">Login</div>
            )}
          </button>
        </div>
      </form>
    </div>
  </div>
  );
};


export default Login;
