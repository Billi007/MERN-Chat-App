import "./login.css";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";
const BASE_URL = "http://localhost:5000";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const { setAuthUser } = useAuthContext();

  // function handleInputErrors(username, password) {
  //   if (!username || !password) {
  //     toast.error("Please fill in all fields");
  //     return false;
  //   }
  
  //   return true;
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { email, password } = data;

      // API call to login user
      const response = await axios.post(
        `${BASE_URL}/api/auth/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      setData("");
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
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-80 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 glass bg-opacity-0">
        <div className="flex justify-center">
          <FaUserCircle className="text-6xl text-white mb-8" />
        </div>

        <form onSubmit={handleSubmit}>

          <div className="my-5">
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70 "
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input 
              value={data.email}
              onChange={e => setData({...data, email: e.target.value})}
              type="text" 
              className="grow" 
              placeholder="Email" />
            </label>
          </div>

          <div>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input 
               value={data.password}
               onChange={e => setData({...data, password: e.target.value})}
              type="password" 
              placeholder="Password" 
              className="grow"  />
            </label>
          </div>

          <Link
            to="/signup"
            className="text-xs  hover:underline hover:text-blue-600 mt-2 inline-block text-white"
          >
            {"Don't"} have an account?
          </Link>

          <div>
            <button
              className="btn btn-block btn-sm mt-4 bg-sky-700 rounded-sm hover:bg-sky-800 border-none text-white"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner "></span>
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
