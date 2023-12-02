import axios from "axios";
import { useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const history = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  async function adminlogin(username, password) {
    try {
      const response = await axios.post(
        "https://stg.dhunjam.in/account/admin/login",
        { username, password }
      );
      console.log(response);

      return response.data;
    } catch (error) {
      console.error("An error occurred during login:", error);
      return null;
    }
  }
  const onSubmit = async (e) => {
    e.preventDefault();

    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;

    const result = await adminlogin(username, password);
    console.log(result, "returned response");

    if (result) {
      console.log(result.data.id);
      localStorage.setItem("id", JSON.stringify(result.data.id));
      history("/dashboard");
      console.log("success");
    } else {
      console.log("error login");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-white">
          Venue Admin Login
        </h2>
        <form className="space-y-6 mt-10" onSubmit={onSubmit}>
          <div>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                placeholder="Username"
                required
                className="block w-full rounded-xl border-0 py-1.5 text-gray-400 ring-1 ring-inset ring-gray-300 ring-opacity-40 placeholder:text-gray-400 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6 p-3"
              />
            </div>
          </div>

          <div>
            <div className="mt-2 relative">
              <input
                id="password"
                name="password"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="block w-full rounded-xl border-0 py-1.5 text-gray-400 ring-1 ring-inset ring-gray-300 ring-opacity-40 placeholder:text-gray-400 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6 p-3"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-xl bg-[#6741D9] px-3 py-1.5 text-sm leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
          <div className="flex items-center justify-center">
            <div className="text-sm">
              <a href="" className="text-white opacity-40 hover:opacity-70">
                New Registration?
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
