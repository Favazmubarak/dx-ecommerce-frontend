import React, { useEffect, useState } from "react";
import api from "../services/axios";
import CategoryCard from "./CategoryCard";

const ExploreCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get("/category");
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchData();
  }, []);

  const sixCategories = categories.slice(0, 6);

  return (
    <section className="py-12 bg-amber-50/40">
      {/* Header Section */}
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 mb-4">
          <p className="text-lg tracking-wide text-gray-500">
            POPULAR
            <span className="font-semibold text-amber-700"> CATEGORIES</span>
          </p>
          <span className="w-10 h-[2px] bg-amber-500 rounded-full"></span>
        </div>

        <p className="w-11/12 mx-auto text-sm text-gray-600 sm:w-3/4 md:w-2/3">
          Explore our most-loved categories and find exactly what you’re looking for — 
          from timeless basics to trendsetting pieces, all in one place.
        </p>
      </div>

      {/* Category Cards Grid */}
      <div className="grid grid-cols-1 gap-6 px-4 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:w-3/4">
        {sixCategories.length > 0 ? (
          sixCategories.map((cat) => (
            <CategoryCard key={cat._id} {...cat} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            Loading categories...
          </p>
        )}
      </div>
    </section>
  );
};

export default ExploreCategories;
