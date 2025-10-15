import React from "react";
import { FaTag } from "react-icons/fa";

const OrderItems = ({ items = [] }) => {
  return (
    <div className="mb-4">
      <h3 className="flex items-center gap-2 mb-3 text-sm font-semibold text-amber-700">
        <FaTag className="text-amber-500" /> Ordered Items
      </h3>

      {items.length === 0 ? (
        <p className="text-sm text-gray-500">No items found</p>
      ) : (
        <ul className="space-y-3">
          {items.map((item, i) => {
            const product = item.product_id || {};
            // console.log(item);
            
            return (
              <li
                key={i}
                className="flex items-center justify-between p-3 transition-all duration-200 border rounded-lg shadow-sm border-amber-100 bg-gradient-to-br from-white to-amber-50 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  {/* Product Image (if available) */}
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.id || "Product"}
                      className="object-cover w-12 h-12 border rounded-lg border-amber-200"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-12 h-12 text-sm font-bold text-white rounded-lg bg-amber-400">
                      {product.name?.charAt(0)?.toUpperCase() || "?"}
                    </div>
                  )}

                  {/* Product Info */}
                  <div>
                    <p className="font-semibold text-gray-800">
                      {product.name || "Unknown Product"}
                    </p>
                    <p className="text-sm text-gray-600">
                      Unit Price: ₹{product.price || "--"}
                    </p>
                    <p className="text-sm text-gray-600">
                      Quantity: <span className="font-medium">{item.quantity}</span>
                    </p>
                  </div>
                </div>

                {/* Item Total */}
                <div className="text-right">
                  <p className="text-lg font-bold text-amber-700">
                    ₹{item.item_total}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default OrderItems;
