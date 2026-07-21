import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Register = () => {

   const {loading, handleRegister} = useAuth();
   const navigate = useNavigate()

   const [username, setUsername] = useState("")
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister({username, email, password})
    navigate('/');
  };

  if(loading){
    return (<main><h1>Loading......</h1></main>)
  }

  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl bg-zinc-900 border border-zinc-800 p-8 shadow-xl">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Register</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Create your account to get started.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Username
            </label>
            <input
              onChange={(e)=>{
                setUsername(e.target.value)
              }}
              type="text"
              placeholder="Enter your username"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Email
            </label>
            <input
              onChange={(e)=>{
                setEmail(e.target.value)
              }}
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Password
            </label>
            <input
              onChange={(e)=>{
                setPassword(e.target.value)
              }}
              type="password"
              placeholder="Create a password"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className=" active:scale-95 w-full rounded-lg bg-blue-600 py-3 text-white font-medium transition hover:bg-blue-700"
          >
            Create Account
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-6 text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            Login
          </Link>
        </p>

      </div>
    </main>
  );
};

export default Register;