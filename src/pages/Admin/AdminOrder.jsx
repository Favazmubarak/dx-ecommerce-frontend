import React, { useEffect, useState } from "react";
import api from "../../services/axios";
import Navbar from "../../components/AdminNavbar";
import OrderCard from "../../components/OrderCard";
import Footer from "../../components/Footer";
import { FaBoxOpen } from "react-icons/fa";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchOrders() {
    try {
      const res = await api.get("/admin/orders");
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error(err);
      setError("⚠️ Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  function handleStatusUpdate(updatedOrder) {
    setOrders((prev) =>
      prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
    );
  }

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-amber-50">
        <p className="text-lg font-semibold text-amber-600 animate-pulse">
          Loading Orders...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-amber-50">
        <p className="text-lg font-semibold text-red-600">{error}</p>
      </div>
    );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-white via-amber-50 to-amber-100">
        <Navbar role="admin" />

        <div className="px-6 py-10 mx-auto max-w-7xl">
          {/* Header */}
          <div className="flex flex-col items-center justify-between mb-10 sm:flex-row">
            <h1 className="text-3xl font-extrabold text-amber-600 font-[Poppins]">
              Admin Dashboard — Orders
            </h1>
            <div className="flex items-center gap-3 text-gray-600">
              <FaBoxOpen className="text-2xl text-amber-500" />
              <p className="text-sm font-medium">
                Total Orders:{" "}
                <span className="font-bold text-amber-600">
                  {orders.length}
                </span>
              </p>
            </div>
          </div>

          {/* Orders Section */}
          {orders.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="transition-transform transform hover:scale-[1.02] hover:shadow-lg"
                >
                  <OrderCard order={order} onStatusUpdate={handleStatusUpdate} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <FaBoxOpen className="mb-3 text-5xl text-amber-400" />
              <p className="text-lg font-medium text-gray-500">
                No orders available yet
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AdminOrders;
