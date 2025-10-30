import api from "../../services/axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/UserNavbar.jsx";
import Footer from "../../components/Footer.jsx";
import { motion } from "framer-motion";
import { FaUserPlus } from "react-icons/fa6";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirm = confirmPassword.trim();

    if (
      !trimmedUsername ||
      !trimmedEmail ||
      !trimmedPassword ||
      !trimmedConfirm
    ) {
      alert(" Please fill in all fields.");
      return;
    }

    if (/\s{2,}/.test(trimmedUsername)) {
      alert("Username cannot contain multiple spaces.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      alert(" Please enter a valid email address.");
      return;
    }

    if (trimmedPassword.length < 4) {
      alert(" Password must be at least 6 characters long.");
      return;
    }

    if (trimmedPassword !== trimmedConfirm) {
      alert(" Passwords do not match.");
      return;
    }

    try {
      await api.post("/register", {
        username: trimmedUsername,
        email: trimmedEmail,
        password: trimmedPassword,
        password2:trimmedConfirm
      });

      alert(" Registration successful! Redirecting to login...");
      navigate("/login", { replace: true });
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error || "Registration failed");
        alert(err.response.data.error || "Registration failed.");
      } else {
        setError("Some error occurred.");
        alert("⚠️ Network or server error. Please try again.");
      }
    }
  }

  function goToLogin() {
    navigate("/login");
  }

  return (
    <>
      <Navbar />

      <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-amber-100 via-white to-amber-200">
        {/* Animated glow background */}
        <div className="absolute w-[800px] h-[800px] bg-amber-500/20 blur-3xl rounded-full animate-pulse"></div>

        {/* Floating Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 w-full max-w-md p-8 border shadow-2xl bg-white/80 backdrop-blur-md rounded-3xl border-amber-200"
        >
          <div className="mb-6 text-center">
            <div className="flex justify-center mb-3">
              <FaUserPlus size={40} className="text-amber-500" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-800">
              Create Your <span className="text-amber-500">Account</span>
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Join WatchWave and experience timeless elegance.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none"
                placeholder="Enter username"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Email
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none"
                placeholder="Enter password"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none"
                placeholder="Confirm password"
              />
            </div>

            {error && (
              <p className="font-medium text-center text-red-600">{error}</p>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-2 font-semibold text-white transition-all rounded-lg shadow-lg bg-amber-500 hover:bg-amber-600"
            >
              Register
            </motion.button>
          </form>

          <p className="mt-5 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <span
              className="font-medium cursor-pointer text-amber-500 hover:underline"
              onClick={goToLogin}
            >
              Login
            </span>
          </p>
        </motion.div>
      </div>

      <Footer />
    </>
  );
};

export default RegisterPage;
