import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ _id, name, description }) => {
  return (
    <Link
      to={`/shop/${_id}`}
      className="flex flex-col justify-between p-6 transition-all duration-300 bg-white border cursor-pointer group rounded-2xl border-amber-100 hover:border-amber-400 hover:shadow-lg"
    >
      {/* Category Name */}
      <h3 className="text-lg font-semibold text-gray-800 transition-colors group-hover:text-amber-600">
        {name}
      </h3>

      {/* Description */}
      <p className="mt-2 text-sm text-gray-600 line-clamp-2">
        {description || "Explore our collection of amazing products."}
      </p>

      {/* Subtle Accent Line */}
      <span className="mt-3 block w-10 h-[2px] bg-amber-500 rounded-full group-hover:w-16 transition-all duration-300"></span>
    </Link>
  );
};

export default CategoryCard;
