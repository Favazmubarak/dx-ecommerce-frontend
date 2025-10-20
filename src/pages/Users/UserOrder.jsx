import React, { useEffect, useState } from "react";
import api from "../../services/axios";
import Navbar from "../../components/UserNavbar";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders");
        setOrders(res.data); 
      } catch (err) {
        console.log(err);
        setError("Failed to fetch your orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <p className="mt-10 text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="mb-6 text-2xl font-bold">My Orders</h1>
        {orders.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {orders.map((order) => (
              <div
                key={order._id}
                onClick={() => navigate(`/orders/${order._id}`)}
                className="p-4 transition bg-white border rounded-lg shadow cursor-pointer hover:shadow-md"
              >
                <div className="flex justify-between mb-2">
                  <p className="font-semibold">Order ID: {order._id}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <p>Total: ₹{order.total_price}</p>
                <p>Status: <span className="font-medium">{order.status}</span></p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">You have no orders yet</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default UserOrders;