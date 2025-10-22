import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt, FaShoppingCart, FaBoxOpen } from "react-icons/fa";
import logo from "../assets/download.png";
import api from "../services/axios";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]); // 🧠 Always an array

  // 🔁 Fetch user and cart
  useEffect(() => {
    async function getData() {
      try {
        const savedUser = await api.get("/logined");
        setUser(savedUser.data);

        const res = await api.get("/cart");
        setCart(res.data.result || []);
      } catch (error) {
        console.error("Error fetching user/cart:", error);
      }
    }

    getData();

    // 🧩 Optional: Auto-update when 'cartUpdated' event is fired
    window.addEventListener("cartUpdated", getData);
    return () => window.removeEventListener("cartUpdated", getData);
  }, []);

  const handleLogout = () => {
    api.delete("/Logout");
    sessionStorage.removeItem("user");
    setUser(null);
    setMenuOpen(false);
    navigate("/user/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b shadow-sm border-amber-100">
      <div className="flex items-center justify-between px-6 py-3 mx-auto max-w-7xl">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img src={logo} alt="WatchWave" className="w-12 h-12" />
          <h1 className="text-2xl font-bold tracking-tight font-[Playfair Display]">
            <span className="text-amber-600">Watch</span>
            <span className="text-gray-800">Wave</span>
          </h1>
        </div>

        {/* Center Links */}
        <ul className="hidden space-x-8 font-medium text-gray-700 md:flex">
          <li className="cursor-pointer hover:text-amber-600" onClick={() => navigate("/")}>Home</li>
          <li className="cursor-pointer hover:text-amber-600" onClick={() => navigate("/products")}>Products</li>
          <li className="cursor-pointer hover:text-amber-600" onClick={() => navigate("/contact")}>Contact</li>
        </ul>

        {/* Right Side */}
        <div className="items-center hidden gap-6 sm:flex">
          {/*  Cart with count badge */}
          <div
            onClick={() => navigate("/user/cart")}
            className="relative cursor-pointer hover:text-amber-600"
            title="Cart"
          >
            <FaShoppingCart className="text-2xl text-gray-700 hover:text-amber-600" />
            {cart.length > 0 && (
              <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-500 rounded-full -top-2 -right-2">
                {cart.length}
              </span>
            )}
          </div>

          {/*  Orders */}
          <div
            onClick={() => navigate("/user/orders")}
            className="relative cursor-pointer hover:text-amber-600"
            title="Orders"
          >
            <FaBoxOpen className="text-2xl text-gray-700 hover:text-amber-600" />
          </div>

          {/* 👤 Profile Dropdown */}
          <div className="relative">
            <div
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 px-3 py-1 rounded-full cursor-pointer bg-amber-50 hover:bg-amber-100"
            >
              {user?.profilePic ? (
                <img
                  src={user.profilePic}
                  alt="Profile"
                  className="object-cover w-8 h-8 rounded-full"
                />
              ) : (
                <FaUserCircle className="w-8 h-8 text-amber-600" />
              )}
              <span className="text-sm font-semibold text-gray-700">
                {user && user.logined ? user.name : "Guest"}
              </span>
            </div>

            {menuOpen && (
              <div className="absolute right-0 w-40 mt-2 bg-white border rounded-lg shadow-lg border-amber-100">
                <ul className="py-2 text-sm text-gray-700">
                  {user?.logined ? (
                    <>
                      <li
                        onClick={() => {
                          setMenuOpen(false);
                          navigate("/profile");
                        }}
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
                      onClick={() => navigate("/user/login")}
                      className="flex items-center gap-2 px-4 py-2 cursor-pointer text-amber-600 hover:bg-amber-100"
                    >
                      <FaSignOutAlt /> Login
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className="flex justify-around py-3 text-gray-700 border-t md:hidden border-amber-100 bg-amber-50">
        <span onClick={() => navigate("/")} className="cursor-pointer hover:text-amber-600">Home</span>
        <span onClick={() => navigate("/products")} className="cursor-pointer hover:text-amber-600">Products</span>
        <span onClick={() => navigate("/user/cart")} className="cursor-pointer hover:text-amber-600">Cart</span>
        <span onClick={() => navigate("/user/orders")} className="cursor-pointer hover:text-amber-600">Orders</span>
      </div>
    </nav>
  );
};

export default Navbar;
