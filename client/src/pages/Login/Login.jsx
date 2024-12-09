import "./login.css";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'


const Login = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  //const BASE_URL = "http://localhost:5000";

  // function handleInputErrors(username, password) {
  //   if (!username || !password) {
  //     toast.error("Please fill in all fields");
  //     return false;
  //   }
  
  //   return true;
  // }

  const signInSchema = yup.object().shape({
    email: yup
      .string()
      .email('Invalid email format')
      .required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const { handleSubmit, register, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(signInSchema),
  });
  

  const onsubmit = async (data) => {
    setLoading(true);

    try {
      

      // API call to login user
      const response = await axios.post("http://localhost:5000/api/auth/login",
        {
        email: data.email,
        password: data.password,
        },
        { withCredentials: true }
      );
      console.log( "login success", response)

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
            <p className="text-red-500 text-sm">{errors.email.message}</p>
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
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <Link
          to="/signup"
          className="text-xs hover:underline hover:text-blue-600 mt-2 inline-block text-white"
        >
          {"don't"} have an account?
        </Link>

        <div>
          <button
            className="btn btn-block btn-sm mt-4 bg-sky-700 rounded-sm hover:bg-sky-800 border-none text-white"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Login"
            )}
          </button>
        </div>
      </form>
    </div>
  </div>
  );
};


export default Login;
