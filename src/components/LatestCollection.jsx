import React, { useEffect, useState } from "react";
import api from "../services/axios";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (error) {
        console.log("Network error");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const latestP = products.slice(0, 8);

  return (
    <section className="py-16 bg-gradient-to-b from-white to-amber-50">
      <div className="container px-4 mx-auto">

        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center gap-2 mb-3">
            <span className="text-sm font-semibold tracking-widest text-amber-600">
              ✨ LATEST COLLECTIONS
            </span>
            <span className="block w-10 h-[1.5px] bg-amber-600"></span>
          </div>
          <p className="max-w-2xl mx-auto text-sm text-gray-600 sm:text-base">
            Discover what’s new this season! From everyday essentials to
            statement styles, our latest collection has something special for
            everyone.
          </p>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : latestP.length > 0 ? (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {latestP.map((p) => (
              <ProductItem
                key={p._id}
                id={p._id}
                image={p.image}
                name={p.name}
                price={p.price}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No products found</p>
        )}
      </div>
    </section>
  );
};

export default LatestCollection;
