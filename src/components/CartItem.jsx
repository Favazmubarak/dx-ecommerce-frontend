import React from "react";
import { Trash2, Plus, Minus } from "lucide-react";

const CartItem = ({ item, onIncrease, onDecrease, onDelete }) => {
  const product = item.product_id;
  // console.log(product.quantity);
  

  return (
    <div className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_1fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
      <div className="flex items-start gap-6">
        <img
          className="w-16 rounded-lg sm:w-20"
          src={`http://localhost:3040${product.image}`}
          alt={product.name}
        />
        <div>
          <p className="text-xs font-medium sm:text-lg">{product.name}</p>
          <p className="mt-2 text-gray-600">Rs {product.price}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="px-2 py-1 border rounded hover:bg-gray-100"
          onClick={() => onDecrease(item._id)}
        >
          <Minus size={14} />
        </button>
        <span className="px-2">{item.quantity}</span>
        <button
          className="px-2 py-1 border rounded hover:bg-gray-100"
          onClick={() => onIncrease(item._id)}
        >
          <Plus size={14} />
        </button>
      </div>

      <button
        className="text-gray-500 transition hover:text-red-600"
        onClick={() => onDelete(item._id)}
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
};

export default CartItem;