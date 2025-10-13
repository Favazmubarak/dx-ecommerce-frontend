import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import LoginForm from "../../components/LoginForm";
import api from "../../services/axios";

const AdminLogin = () => {
  const [loading, setLoading] = useState(false);

  async function checkAdmin(email, password) {
    let msg;
    let isLogin = false;
    setLoading(true);
    try {
      const res = await api.post("/admin/reg", { email, password });
      msg = res.data.message;
      isLogin = true;
    } catch (err) {
      msg = err?.response?.data?.error || "Server failed";
    } finally {
      setLoading(false);
      return { msg, isLogin };
    }
  }

  return (
    <>
      {/* Optional Navbar */}
      {/* <Navbar /> */}

      <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-amber-50 via-white to-amber-100">
        {/* 🔸 Animated background orbs */}
        <div className="absolute w-[600px] h-[600px] bg-amber-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob top-[-200px] left-[-200px]"></div>
        <div className="absolute w-[600px] h-[600px] bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 top-[400px] right-[-250px]"></div>
        <div className="absolute w-[400px] h-[400px] bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 bottom-[0px] left-[300px]"></div>

        {/* 🔸 Floating Login Card */}
        <div className="relative z-10 p-8 bg-white/70 backdrop-blur-xl border border-amber-100 shadow-2xl rounded-3xl w-[90%] sm:w-[400px] text-center transform hover:scale-[1.02] transition-all duration-300">
          <h1 className="mb-2 font-serif text-4xl font-bold tracking-wide text-amber-500">
            WATCHWAVE
          </h1>
          <p className="mb-6 font-medium text-gray-600">Admin Login Panel</p>

          <div
            className={`transition-all duration-500 ${
              loading
                ? "opacity-40 pointer-events-none"
                : "opacity-100 pointer-events-auto"
            }`}
          >
            <LoginForm
              logincheck={checkAdmin}
              path={"/admin/home"}
            />
          </div>

          {/* 🔸 Loading indicator */}
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center transition-all bg-white/70 backdrop-blur-lg rounded-3xl">
              <div className="w-12 h-12 border-4 rounded-full border-amber-500 border-t-transparent animate-spin"></div>
              <p className="mt-3 font-semibold text-amber-600 animate-pulse">
                Authenticating Admin...
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
