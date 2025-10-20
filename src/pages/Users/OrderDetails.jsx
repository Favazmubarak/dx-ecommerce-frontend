import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/axios";
import Navbar from "../../components/UserNavbar";
import Footer from "../../components/Footer";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get(`/orders/${id}`);       
        console.log(res);
         
        setOrder(res.data.orders);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch order details");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) return <p className="mt-10 text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!order) return <p className="mt-10 text-center">Order not found</p>;

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="mb-4 text-2xl font-bold">Order Details</h1>

        <div className="p-4 mb-6 bg-white border rounded-lg shadow">
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Total:</strong> ₹{order.total_price}</p>
          <p><strong>Placed on:</strong> {new Date(order.createdAt).toLocaleString()}</p>
        </div>

        <div className="p-4 mb-6 bg-white border rounded-lg shadow">
          <h2 className="mb-2 text-xl font-semibold">Delivery Address</h2>
          <p>{order.address.line1}</p>
          <p>{order.address.line2}</p>
          <p>{order.address.city}, {order.address.state}, {order.address.postal_code}</p>
          <p>{order.address.country}</p>
          <p>Phone: {order.address.phone}</p>
        </div>

        <div className="p-4 bg-white border rounded-lg shadow">
          <h2 className="mb-2 text-xl font-semibold">Items</h2>
          {order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between p-2 mb-2 border rounded bg-gray-50">
              <div>
                <p className="font-semibold">{item.product_id?.name}</p>
                <p className="text-sm text-gray-600">Unit Price: ₹{item.price}</p>
                <p className="text-sm">Qty: {item.quantity}</p>
              </div>
              <div className="font-semibold">₹{item.item_total}</div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderDetails;
 