import React, { useState } from "react";
import api from "../../services/axios";
import {FaHandshake } from "react-icons/fa6";
import { motion } from "framer-motion";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function checkUser(email, password) {
    let msg;
    let isLogin = false;
    try {
      const res = await api.post("/login", { email, password });
      msg = res.data.message;
      isLogin = true;
    } catch (err) {
      msg = err?.response?.data?.error || "Server Failed";
    } finally {
      return { msg, isLogin };
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { msg, isLogin } = await checkUser(email, password);
    setMessage(msg);
    setLoading(false);
    if (isLogin) window.location.href = "/";
  };

  return (
    <div className="flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-b from-blue-950 via-slate-900 to-black">

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-[90%] max-w-md p-10 bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 text-white"
      >
        <div className="flex flex-col items-center mb-6 text-center">
          <div className="flex items-center gap-2 mb-2">
            <FaHandshake size={32} className="text-amber-400 animate-spin-slow" />
            <h1 className="text-3xl font-extrabold tracking-widest">
              <span className="text-amber-400">Watch</span>
              <span className="text-gray-100">Wave</span>
            </h1>
          </div>
          <p className="text-sm tracking-widest text-gray-400 uppercase">
            WELCOME BACK
          </p>
        </div>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 text-gray-900 bg-white rounded-lg outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-gray-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-3 text-gray-900 bg-white rounded-lg outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-gray-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
            loading
              ? "bg-amber-400 cursor-not-allowed"
              : "bg-amber-500 hover:bg-amber-600 hover:shadow-lg hover:shadow-amber-500/30"
          }`}
        >
          {loading ? "Authenticating..." : "Login"}
        </button>

        {message && (
          <p className="mt-4 text-sm text-center text-amber-400">{message}</p>
        )}
      </motion.form>
    </div>
  );
};

export default UserLogin;
