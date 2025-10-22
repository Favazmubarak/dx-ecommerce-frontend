import React, { useState } from "react";
import {
  FaUserShield,
  FaBoxes,
  FaChartLine,
  FaCubes,
  FaUsers,
  FaSignOutAlt,
  FaMoon,
  FaSun,
  FaClipboardList,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../assets/download.png";
import api from "../services/axios";

const AdminNavbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDarkMode = () => setDarkMode(!darkMode);


  const links = [
    { name: "Dashboard", icon: <FaChartLine />, path: "/admin/home" },
    { name: "Products", icon: <FaCubes />, path: "/admin/products" },
    { name: "Categories", icon: <FaBoxes />, path: "/admin/categories" },
    { name: "Orders", icon: <FaClipboardList />, path: "/admin/orders" }, // New
    { name: "Users", icon: <FaUsers />, path: "/admin/users" },
  ];

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      api
        .delete("/logout")
        .then((res) => {
          console.log(res);
          if (res) navigate("/admin/login");
          else console.log("Logout session not cleared properly");
        })
        .catch((err) => console.log("Logout failed:", err));
    }
  };

  return (
    <nav
      className={`sticky top-0 z-50 border-b shadow-sm font-[Poppins] ${
        darkMode
          ? "bg-gray-900 border-gray-800 text-gray-100"
          : "bg-white border-amber-100 text-gray-900"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo & Brand */}
        <div
          onClick={() => navigate("/admin/home")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div
            className={`flex items-center justify-center rounded-full w-11 h-11 border-2 ${
              darkMode
                ? "border-amber-500 bg-amber-600"
                : "border-amber-400 bg-white"
            }`}
          >
            <img src={logo} alt="Admin Logo" className="object-contain w-7 h-7" />
          </div>

          <h1
            className="text-2xl font-semibold tracking-wide"
            style={{
              fontFamily: "'Playfair Display', serif",
              letterSpacing: "1px",
            }}
          >
            <span className="font-bold text-amber-500">Watch</span>
            <span
              className={`${
                darkMode ? "text-white" : "text-gray-800"
              } font-medium`}
            >
              Wave
            </span>
            <span className="ml-1 text-sm font-light text-gray-400">Admin</span>
          </h1>
        </div>

        {/* Desktop Links */}
        <ul className="items-center hidden gap-8 font-medium md:flex">
          {links.map((link) => (
            <li
              key={link.name}
              onClick={() => navigate(link.path)}
              className={`flex items-center gap-2 cursor-pointer transition ${
                darkMode
                  ? "text-gray-300 hover:text-amber-400"
                  : "text-gray-700 hover:text-amber-600"
              }`}
            >
              {link.icon}
              {link.name}
            </li>
          ))}
        </ul>

   
   
        <div className="flex items-center gap-4">
          <div
            onClick={toggleDarkMode}
            className={`text-lg cursor-pointer ${
              darkMode ? "text-amber-400" : "text-amber-600"
            }`}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <div
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center justify-center w-10 h-10 text-black rounded-full cursor-pointer bg-amber-500 hover:bg-amber-600"
            >
              <FaUserShield />
            </div>

            {menuOpen && (
              <div
                className={`absolute right-0 mt-3 w-44 rounded-lg shadow-lg border ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 text-gray-100"
                    : "bg-white border-amber-100 text-gray-800"
                }`}
              >
                <ul className="py-2 text-sm">
                  <li
                    onClick={() => navigate("/admin/profile")}
                    className="px-4 py-2 cursor-pointer hover:bg-amber-100"
                  >
                    Profile
                  </li>
                  <li
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-red-600 cursor-pointer hover:bg-red-100"
                  >
                    <FaSignOutAlt /> Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="block px-4 pb-3 md:hidden">
        <div className="flex justify-around text-sm">
          {links.map((link) => (
            <div
              key={link.name}
              onClick={() => navigate(link.path)}
              className={`flex flex-col items-center gap-1 cursor-pointer ${
                darkMode ? "hover:text-amber-400" : "hover:text-amber-600"
              }`}
            >
              {link.icon}
              {link.name}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
