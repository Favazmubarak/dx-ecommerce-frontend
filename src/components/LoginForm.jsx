import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEnvelope, FaLock, FaClock } from "react-icons/fa6"; // 🕒 watch brand icon feel

const LoginForm = ({ message1, logincheck, path }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { msg, isLogin } = await logincheck(email, password);
    setMessage(msg);
    setLoading(false);
    if (isLogin) navigate(path);
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col p-8 space-y-6 transition-all duration-300 border shadow-xl bg-white/70 backdrop-blur-xl border-amber-100 rounded-3xl hover:shadow-2xl"
      >
        {/* Brand Title */}
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-2 mb-2">
            <FaClock className="text-3xl text-amber-500 animate-pulse" />
            <h1 className="text-3xl font-extrabold tracking-wide text-amber-400">
              {message1}
            </h1>
          </div>
          <p className="text-sm text-gray-600">Please enter your credentials</p>
        </div>

        {/* Email Input */}
        <div className="relative">
          <FaRegEnvelope className="absolute left-4 top-3.5 text-amber-500" />
          <input
            type="email"
            placeholder="Email"
            className="w-full py-3 pl-10 pr-4 text-gray-800 placeholder-gray-400 transition-all duration-300 border rounded-xl bg-white/60 border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password Input */}
        <div className="relative">
          <FaLock className="absolute left-4 top-3.5 text-amber-500" />
          <input
            type="password"
            placeholder="Password"
            className="w-full py-3 pl-10 pr-4 text-gray-800 placeholder-gray-400 transition-all duration-300 border rounded-xl bg-white/60 border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 font-semibold rounded-xl text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-md hover:shadow-amber-300/50 ${
            loading ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02]"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></span>
              Logging in...
            </span>
          ) : (
            "Login"
          )}
        </button>

        {/* Message Display */}
        {message && (
          <p
            className={`text-center text-sm font-medium ${
              message.includes("fail") || message.includes("wrong")
                ? "text-red-500"
                : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
