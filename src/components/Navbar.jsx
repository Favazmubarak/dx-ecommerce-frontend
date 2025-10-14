import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import logo from "../assets/download.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Simulate logged-in user (replace this with your actual auth logic)
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    setUser(savedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between w-full px-8 py-3 bg-white shadow-md">
      {/* Left: Logo + Brand */}
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-2 cursor-pointer"
      >
        <img src={logo} alt="WatchWave" className="w-14 h-14" />
        <h1 className="text-2xl font-bold tracking-tight font-[Poppins]">
          <span className="text-amber-600">Watch</span>
          <span className="text-gray-800">Wave</span>
        </h1>
      </div>

      {/* Center: Navigation Links */}
      <ul className="hidden space-x-8 text-gray-700 lg:flex">
        <li
          className="cursor-pointer hover:text-amber-600"
          onClick={() => navigate("/")}
        >
          Home
        </li>
        <li
          className="cursor-pointer hover:text-amber-600"
          onClick={() => navigate("/categories")}
        >
          Categories
        </li>
        <li
          className="cursor-pointer hover:text-amber-600"
          onClick={() => navigate("/products")}
        >
          Products
        </li>
        <li
          className="cursor-pointer hover:text-amber-600"
          onClick={() => navigate("/contact")}
        >
          Contact
        </li>
      </ul>

      {/* Right: User Section */}
      <div className="relative">
        <div
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-2 px-3 py-1 rounded-full cursor-pointer bg-amber-50 hover:bg-amber-100"
        >
          {user?.profilePic ? (
            <img
              src={user.profilePic}
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <FaUserCircle className="w-8 h-8 text-amber-600" />
          )}
          <span className="text-sm font-semibold text-gray-700">
            {user?.name ? user.name : "Guest"}
          </span>
        </div>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-36">
            <ul className="py-2 text-sm text-gray-700">
              {user ? (
                <>
                  <li
                    onClick={() => navigate("/profile")}
                    className="px-4 py-2 cursor-pointer hover:bg-amber-100"
                  >
                    View Profile
                  </li>
                  <li
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-red-500 cursor-pointer hover:bg-red-100"
                  >
                    <FaSignOutAlt /> Logout
                  </li>
                </>
              ) : (
                <li
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 cursor-pointer hover:bg-amber-100"
                >
                  Sign In
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
