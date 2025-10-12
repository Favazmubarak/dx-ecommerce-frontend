import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = ({message1,logincheck,path}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(logincheck);
    const {msg,isLogin} = await logincheck(email,password)
    setMessage(msg)
    if(isLogin){
        navigate(path)
    }
  };    

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-blue-300">
        <form
          onSubmit={handleSubmit}
          className="p-8 bg-white shadow-lg rounded-2xl w-96"
        >
          <h1 className="mb-6 text-3xl font-bold text-center text-blue-950">
            {message1}
          </h1>
          <h2 className="mb-6 text-2xl font-bold text-center">Login</h2>

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 border border-blue-300 rounded-md focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 border border-blue-300 rounded-md focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full p-3 text-white transition-all bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
          {message && (
            <p className="mt-4 text-sm text-center text-gray-700">{message}</p>
          )}
        </form>
      </div>
    </>
  );
};

export default LoginForm;
