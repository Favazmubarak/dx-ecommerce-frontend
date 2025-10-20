import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import {useCart} from "../hooks/useCart.jsx";



const ProductItem = ({ id, image, name, price }) => {
  const {addToCart}=useCart()
  return (
    <Link
      to={`/products/${id}`}
      className="block overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-md rounded-2xl hover:shadow-xl group"
    >
      {/* Image Container */}
      <div className="relative flex items-center justify-center w-full h-64 overflow-hidden bg-gray-100">
        <img
          src={`http://localhost:3040${image}`}
          alt={name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        />

        {/* Hover Add to Cart Icon */}
        <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 bg-black bg-opacity-0 group-hover:bg-opacity-40">
          <div className="transition-opacity duration-300 opacity-0 group-hover:opacity-100">
            <button
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition rounded-full shadow-md bg-amber-600 hover:bg-amber-700"
              onClick={(e) =>{ e.preventDefault(); e.stopPropagation(); addToCart(id);}} // prevent redirect on click
            >
              <ShoppingCart size={16} /> Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800 truncate transition-colors group-hover:text-amber-600">
          {name}
        </h3>
        <p className="mt-2 text-lg font-bold text-amber-600">₹{price}</p>
      </div>
    </Link>
  );
};

export default ProductItem;
