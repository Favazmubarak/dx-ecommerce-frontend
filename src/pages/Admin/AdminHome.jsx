import React, { useEffect, useState } from "react";
import NavbarAdmin from "../../components/AdminNavbar";
import Footer from "../../components/Footer";
import api from "../../services/axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaBoxOpen,FaBagShopping , FaTags } from "react-icons/fa6";

const AdminHome = () => {
  const [counts, setCounts] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get("admin/loadhome");
        setCounts(res.data);
      } catch (err) {
        console.error("Failed to load dashboard counts");
      }
    }
    fetchData();
  }, []);

  const stats = [
    {
      title: "Users",
      count: counts.userCount,
      icon: <FaUser className="text-3xl text-amber-600 group-hover:text-white" />,
      route: "/admin/users",
      gradient: "from-amber-400/90 to-yellow-500/90",
    },
    {
      title: "Products",
      count: counts.productCount,
      icon: <FaBoxOpen className="text-3xl text-emerald-600 group-hover:text-white" />,
      route: "/admin/products",
      gradient: "from-emerald-400/90 to-teal-500/90",
    },
    {
      title: "Orders",
      count: counts.orderCount,
      icon: <FaBagShopping className="text-3xl text-indigo-600 group-hover:text-white" />,
      route: "/admin/orders",
      gradient: "from-indigo-400/90 to-blue-500/90",
    },
    {
      title: "Categories",
      count: counts.categoryCount,
      icon: <FaTags className="text-3xl text-rose-600 group-hover:text-white" />,
      route: "/admin/categories",
      gradient: "from-rose-400/90 to-pink-500/90",
    },
  ];

  return (
    <> <div className="min-h-screen overflow-hidden bg-gradient-to-br from-white via-amber-50 to-amber-100">
      <NavbarAdmin role="admin" />

      {/* Floating Glass Header */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative flex flex-col items-center justify-center py-20 text-center"
      >
        <div className="absolute rounded-full w-72 h-72 bg-gradient-to-r from-amber-300 to-amber-100 blur-3xl opacity-40 animate-pulse"></div>
        <h1 className="text-5xl font-extrabold tracking-wide md:text-6xl text-amber-600 drop-shadow-sm">
          Welcome, Admin 🕰️
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Precision, elegance, and control — your WatchWave admin dashboard.
        </p>
      </motion.div>

      {/* Animated Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="grid grid-cols-1 gap-10 px-6 pb-24 mx-auto max-w-7xl sm:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.08, rotateX: 3, rotateY: -3 }}
            transition={{ type: "spring", stiffness: 200 }}
            onClick={() => navigate(item.route)}
            className={`group cursor-pointer bg-white/60 backdrop-blur-xl border border-white/50 rounded-3xl shadow-lg hover:shadow-amber-300/50 relative overflow-hidden`}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-all duration-500`}
            ></div>

            <div className="relative z-10 flex flex-col items-center p-10 text-center">
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-2xl font-semibold text-gray-700 group-hover:text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-4xl font-bold text-gray-900 group-hover:text-white">
                {item.count ?? 0}
              </p>
              <p className="mt-2 text-sm text-gray-400 group-hover:text-white/90">
                View & Manage {item.title.toLowerCase()}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

    </div>
      <Footer />
    </>
   
  );
};

export default AdminHome;
