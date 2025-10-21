import React, { useEffect, useState } from "react";
import api from "../../services/axios";
import Navbar from "../../components/UserNavbar";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import { FaBoxOpen, FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders");
        setOrders(res.data.orders);
        console.log(res);
        
      } catch (err) {
        console.log(err);
        setError("Failed to fetch your orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50">
        <div className="w-10 h-10 border-4 rounded-full border-amber-500 border-t-transparent animate-spin"></div>
        <p className="mt-4 text-amber-600">Loading your orders...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-amber-50">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return (
          <span className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-yellow-800 bg-yellow-100 rounded-full">
            <FaClock className="text-yellow-600" /> Pending
          </span>
        );
      case "completed":
        return (
          <span className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
            <FaCheckCircle className="text-green-600" /> Completed
          </span>
        );
      case "cancelled":
        return (
          <span className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-red-800 bg-red-100 rounded-full">
            <FaTimesCircle className="text-red-600" /> Cancelled
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full">
            <FaBoxOpen className="text-gray-500" /> {status}
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-screen bg-amber-50">
      <Navbar />
      <main className="flex-1 px-6 py-10 mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold text-center text-amber-600 font-[Poppins]">
          My Orders
        </h1>

        {orders.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {orders.map((order) => (
              <div
                key={order._id}
                onClick={() => navigate(`/orders/${order._id}`)}
                className="p-6 transition-all duration-300 bg-white border shadow-md cursor-pointer border-amber-100 rounded-2xl hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-base font-semibold text-gray-800">
                    Order #{order._id.slice(-6)}
                  </h2>
                  {getStatusBadge(order.status)}
                </div>

                <div className="mb-2 text-sm text-gray-600">
                  <p>
                    <span className="font-medium text-gray-800">Date:</span>{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">Items:</span>{" "}
                    {order.items?.length || 1}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <p className="text-lg font-semibold text-amber-600">
                    ₹{order.total_price}
                  </p>
                  <button
                    onClick={() => navigate(`/orders/${order._id}`)}
                    className="px-4 py-2 text-sm font-medium text-white transition rounded-lg bg-amber-500 hover:bg-amber-600"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500">
            <FaBoxOpen className="mb-3 text-5xl text-gray-400" />
            <p className="text-lg font-medium">You have no orders yet</p>
            <p
              onClick={() => navigate("/")}
              className="mt-2 cursor-pointer text-amber-600 hover:underline"
            >
              Start shopping →
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default UserOrders;
