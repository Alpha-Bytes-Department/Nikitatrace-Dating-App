import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import logo from '../../assets/logo/logo.svg'
import { useNavigate } from "react-router-dom";

import {setAuthTokens} from "../../lib/cookie-utils"
import apiClient from "../../lib/api-client";
import {loginUrl} from "../../../endpoints"

const SignIn = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("")

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

const onSubmit = async (data) => {
  try {
    const response = await apiClient.post(loginUrl, {
      email_address: data.email_address,
      password: data.password,
    });

    // Clear error only on success
    setServerError("");
    setAuthTokens(response.data.access_token, response.data.refresh_token);
    navigate('/');
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);

    // Always update the error, even if the same as before
    const newMessage = error.response?.data?.message || "Login failed.";
    setServerError(prev => prev !== newMessage ? newMessage : newMessage + " "); 
    // ^ This forces re-render even if the message is the same
  }
};



  return (
    <div className="flex min-h-screen justify-center items-center ">
      

      {/* Right Side */}
      <div className="flex items-center justify-center px-10 py-16 w-1/4 bg-[#FCFDEC] border border-[#CE8B38] rounded-lg shadow-md">
        <div className="max-w-xl w-full relative">
          <div className="flex flex-col items-center">
            <img src={logo} alt="" className="w-36 mb-5" />
          <h2 className="text-center text-3xl font-semibold mb-6 text-gray-800">
            Sign In
          </h2>
          </div>
          {serverError && (
              <p className="text-red-600 text-sm mb-4">{serverError}</p>
            )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <label className="text-gray-400">Username</label>
            <input
              type="email"
              placeholder="Enter Username"
              {...register("email_address", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email",
                },
              })}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#CE8B38] outline-none"
            />
            {errors.email_address && (
              <p className="text-red-600 text-sm">{errors.email_address.message}</p>
            )}


            <div className="relative">
              <label className="text-gray-400">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                })}
                placeholder="Enter your Password"
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#CE8B38] outline-none"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 mt-6 flex items-center text-gray-300"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm mb-10">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register("remember")}
                  className="accent-[#CE8B38]"
                />
                Remember me
              </label>
              <a
                href="/forgot_password"
                className="text-[#CE8B38] hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="text-white px-4 py-2 rounded-xl bg-[#CE8B38] w-full"
              disabled={!isValid}
            >
              Sign In
            </button>
          </form>
          
        </div>
      </div>
    </div>
  );
};

export default SignIn;