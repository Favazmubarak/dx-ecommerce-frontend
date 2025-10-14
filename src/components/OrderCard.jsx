import React, { useState } from "react";
import OrderItems from "./OrderItems";
import api from "../services/axios";
import { FaUserCircle, FaMapMarkerAlt, FaPhoneAlt, FaBox, FaMoneyBillWave } from "react-icons/fa";

const OrderCard = ({ order, onStatusUpdate }) => {
  const [status, setStatus] = useState(order.status);
  const [loading, setLoading] = useState(false);

  const statuses = ["pending", "shipped", "delivered", "cancelled"];
  const address = order.address || {};

  async function handleStatusChange(e) {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setLoading(true);

    try {
      const res = await api.put(`/admin/orders/${order._id}`, {
        status: newStatus,
      });
      if (onStatusUpdate) onStatusUpdate(res.data.updated);
    } catch (error) {
      console.error(error);
      alert("Failed to update status");
      setStatus(order.status);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-5 bg-white border border-amber-100 rounded-2xl shadow-md transition-all duration-200 hover:shadow-xl hover:scale-[1.01]">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <FaUserCircle className="text-3xl text-amber-500" />
          <div>
            <p className="text-lg font-semibold text-gray-800">
              {order.user_id?.username || "Unknown User"}
            </p>
            <p className="text-sm text-gray-500">{order.user_id?.email}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end gap-1 text-amber-600">
            <FaMoneyBillWave />
            <p className="text-lg font-bold">₹{order.total_price}</p>
          </div>
          <p className="text-xs text-gray-500">
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Items */}
      <div className="p-3 mb-3 rounded-lg bg-amber-50">
        <OrderItems items={order.items} />
      </div>

      {/* Address */}
      <div className="p-3 mb-3 border rounded-lg border-amber-100 bg-gradient-to-b from-white to-amber-50">
        <h3 className="flex items-center mb-1 text-sm font-semibold text-amber-700">
          <FaMapMarkerAlt className="mr-2 text-amber-500" /> Delivery Address
        </h3>
        <p className="text-sm text-gray-700">{address.line2}</p>
        <p className="text-sm text-gray-700">{address.line1}</p>
        <p className="text-sm text-gray-700">
          {address.city}, {address.state} - {address.postal_code}
        </p>
        <p className="text-sm text-gray-700">{address.country}</p>
        {address.phone && (
          <p className="flex items-center gap-2 text-sm text-gray-700">
            <FaPhoneAlt className="text-amber-500" /> {address.phone}
          </p>
        )}
      </div>

      {/* Status */}
      <div className="flex items-center justify-between pt-2 border-t border-amber-100">
        <div className="flex items-center gap-2">
          <FaBox className="text-amber-500" />
          <span className="font-semibold text-gray-700">Status:</span>
          <select
            value={status}
            onChange={handleStatusChange}
            disabled={loading}
            className={`px-3 py-1 text-sm font-medium rounded-md border transition-colors ${
              status === "delivered"
                ? "bg-green-100 text-green-700 border-green-300"
                : status === "shipped"
                ? "bg-blue-100 text-blue-700 border-blue-300"
                : status === "cancelled"
                ? "bg-red-100 text-red-700 border-red-300"
                : "bg-amber-100 text-amber-700 border-amber-300"
            }`}
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </div>
        {loading && (
          <span className="text-sm text-gray-500 animate-pulse">Updating...</span>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
