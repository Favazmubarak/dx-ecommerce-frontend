import { useEffect, useState } from "react";
import api from "../../services/axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/admin/products");
        setProducts(res.data || []);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await api.delete(`/admin/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      alert("Failed to delete product");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold text-amber-600">
        Loading products...
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
      <Navbar role="admin" />
      <div className="min-h-screen px-6 py-10 bg-amber-50">
        <div className="p-8 mx-auto bg-white border shadow-lg max-w-7xl rounded-3xl border-amber-200">
          <div className="flex flex-col items-center justify-between mb-8 md:flex-row ">
            <h1 className="text-3xl font-bold text-amber-600">
              🛍️ Admin — Product Management
            </h1>
            <button
              onClick={() => navigate("/admin/products/create")}
              className="px-5 py-2 mt-4 font-semibold text-white transition rounded-full shadow md:mt-0 bg-amber-500 hover:bg-amber-600"
            >
              + Add Product
            </button>
          </div>

          <div className="overflow-x-auto border shadow-sm rounded-xl border-amber-100">
            <table className="min-w-full text-left border-collapse">
              <thead className="text-white bg-amber-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Image</th>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Category</th>
                  <th className="px-4 py-3 font-semibold">Price</th>
                  <th className="px-4 py-3 font-semibold">Description</th>
                  <th className="px-4 py-3 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr
                      key={product._id}
                      className="transition border-b border-amber-100 hover:bg-amber-100"
                    >
                      <td className="px-4 py-3">
                        <img
                          src={`http://localhost:3000${product.image}`}
                          alt={product.name}
                          className="object-cover w-16 h-16 mx-auto border rounded-lg border-amber-200"
                        />
                      </td>
                      <td className="px-4 py-3 font-medium text-amber-700">
                        {product.name}
                      </td>
                      <td className="px-4 py-3">
                        {product.category?.name || (
                          <span className="italic text-gray-400">
                            No Category
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 font-semibold text-amber-700">
                        ₹{product.price}
                      </td>
                      <td className="max-w-sm px-4 py-3 text-gray-600 truncate">
                        {product.description}
                      </td>
                      <td className="px-4 py-3 space-x-2 text-center">
                        <button
                          onClick={() =>
                            navigate(`/admin/products/edit/${product._id}`)
                          }
                          className="px-5 py-1 my-2 text-sm font-semibold text-white transition bg-blue-500 rounded-lg hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="px-3 py-1 text-sm font-semibold text-white transition bg-red-500 rounded-lg hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      className="px-4 py-6 text-center text-gray-500"
                      colSpan="6"
                    >
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdminProducts;
