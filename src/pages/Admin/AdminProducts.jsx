import { useEffect, useState } from "react";
import api from "../../services/axios";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";
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
    } catch {
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
      <AdminNavbar />

      <div className="min-h-screen py-12 bg-gradient-to-br from-white via-amber-50 to-amber-100">
        <div className="p-8 mx-auto bg-white border shadow-md border-amber-100 max-w-7xl rounded-3xl">
          {/* Header */}
          <div className="flex flex-col items-center justify-between mb-8 md:flex-row">
            <div>
              <h1 className="text-3xl font-bold text-amber-700">
                🕰️ Product Management
              </h1>
              <p className="mt-2 text-gray-600">
                Manage and review all products in your inventory.
              </p>
            </div>

            <button
              onClick={() => navigate("/admin/products/add")}
              className="px-6 py-2 mt-6 font-semibold text-white rounded-full shadow-sm md:mt-0 bg-amber-500 hover:bg-amber-600"
            >
              + Add Product
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-amber-100 rounded-2xl">
            <table className="min-w-full text-sm border-collapse">
              <thead className="text-white bg-amber-500">
                <tr>
                  <th className="px-4 py-3 font-medium text-left">Image</th>
                  <th className="px-4 py-3 font-medium text-left">Name</th>
                  <th className="px-4 py-3 font-medium text-left">Category</th>
                  <th className="px-4 py-3 font-medium text-left">Price</th>
                  <th className="px-4 py-3 font-medium text-left">Description</th>
                  <th className="px-4 py-3 font-medium text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr
                      key={product._id}
                      className="bg-white border-b border-amber-100 even:bg-yellow-50 hover:bg-amber-100"
                    >
                      <td className="px-4 py-3">
                        <img
                          src={`http://localhost:3040${product.image}`}
                          alt={product.name}
                          className="object-cover w-16 h-16 mx-auto border rounded-md shadow-sm border-amber-200"
                        />
                      </td>
                      <td className="px-4 py-3 font-medium text-amber-700">
                        {product.name}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {product.category?.name || (
                          <span className="italic text-gray-400">
                            No Category
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 font-semibold text-green-700">
                        ₹{product.price}
                      </td>
                      <td className="max-w-sm px-4 py-3 text-gray-500 truncate">
                        {product.description}
                      </td>
                      <td className="px-4 py-3 space-x-2 text-center">
                        <button
                          onClick={() =>
                            navigate(`/admin/products/${product._id}`)
                          }
                          className="px-4 py-1 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="px-4 py-1 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
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
