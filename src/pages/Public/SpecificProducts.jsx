import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/axios";
import Navbar from "../../components/UserNavbar";
import Footer from "../../components/Footer";
import { ShoppingCart } from "lucide-react";
import LatestCollection from "../../components/LatestCollection";
import ExploreCategories from "../../components/ExploreCategories";
import {useCart} from "../../hooks/useCart.jsx";

export default function SpecificProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {addToCart} = useCart()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/products/${id}`);
        console.log(res);
        
        setProduct(res.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
    
  
    
  }, [id]);

  

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold text-amber-600">
        Loading product...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold text-red-500">
        {error}
      </div>
    );

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-white via-amber-50 to-amber-100">
        <div className="max-w-6xl px-6 py-12 mx-auto">
          {/* Product Section */}
          <div className="flex flex-col gap-10 md:flex-row">
            {/* Image Section */}
            <div className="flex-1 overflow-hidden bg-white border shadow-md rounded-3xl border-amber-100 group">
              <img
                src={`http://74.225.166.12/api/${product.image}`}
                alt={product.name}
                className="object-cover w-full h-[28rem] rounded-3xl transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Details Section */}
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl font-bold text-gray-800">
                {product.name}
              </h2>

              <p className="text-lg text-gray-600">
                Category:{" "}
                <span className="font-semibold text-amber-600">
                  {product.category_id.name || "Uncategorized"}
                </span>
              </p>

              <p className="text-2xl font-bold text-green-700">
                ₹{product.price}
              </p>

              <p className="leading-relaxed text-gray-700">
                {product.description}
              </p>

              {/* Add to Cart Button */}
              <button
                onClick={() => addToCart(product._id) }
                className="flex items-center gap-2 px-6 py-3 text-white transition-all rounded-full shadow-md bg-amber-600 hover:bg-amber-700"
              >
                <ShoppingCart size={18} /> Add to Cart
              </button>

              {/* Category Description (if exists) */}
              {product.category?.description && (
                <div className="p-4 mt-6 bg-white border shadow-sm rounded-xl border-amber-100">
                  <h3 className="text-lg font-semibold text-amber-700">
                    About {product.category.name}
                  </h3>
                  <p className="mt-1 text-gray-600">
                    {product.category.description}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Related Sections */}
          <div className="mt-16 space-y-12">
            <LatestCollection />
            <ExploreCategories />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
