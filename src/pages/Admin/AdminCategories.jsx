import React, { useEffect, useState } from "react";
import api from "../../services/axios";
import AdminNavbar from "../../components/AdminNavbar";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaEdit, FaTrashAlt, FaBoxes } from "react-icons/fa";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/admin/categories");
        setCategories(res.data);
      } catch (err) {
        console.log(err);
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  async function handleDelete(id) {
    try {
      if (!window.confirm("Are you sure you want to delete this category?"))
        return;
      await api.delete(`/admin/categories/${id}`);
      setCategories(categories.filter((p) => p._id !== id));
    } catch (error) {
      console.log(error);
      const msg =
        error.response?.data?.message ||
        "Failed to delete category. Please try again.";
      alert(msg);
    }
  }

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-amber-600 bg-amber-50">
        <p className="text-lg font-semibold">Loading Categories...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500 bg-amber-50">
        {error}
      </div>
    );

  return (
    <>
      <AdminNavbar role="admin" />
      <div className="min-h-screen py-12 bg-gradient-to-b from-white via-amber-50 to-amber-100">
        <div className="p-8 mx-auto bg-white border shadow-lg max-w-7xl rounded-3xl border-amber-100">
          {/* Header */}
          <div className="flex flex-col items-center justify-between mb-8 md:flex-row">
            <div className="flex items-center gap-3">
              <FaBoxes size={26} className="text-amber-600" />
              <h1 className="text-3xl font-extrabold text-amber-600">
                Category Management
              </h1>
            </div>

            <button
              onClick={() => navigate("/admin/category")}
              className="flex items-center gap-2 px-6 py-2 mt-4 font-semibold text-white transition rounded-full shadow-md md:mt-0 bg-amber-500 hover:bg-amber-600"
            >
              <FaPlus /> Add Category
            </button>
          </div>

          {/* Category Table */}
          <div className="overflow-x-auto border shadow-sm rounded-2xl border-amber-100">
            <table className="min-w-full text-sm border-collapse">
              <thead className="text-white bg-amber-500">
                <tr>
                  <th className="px-4 py-3 font-semibold text-left">Name</th>
                  <th className="px-4 py-3 font-semibold text-left">
                    Description
                  </th>
                  <th className="px-4 py-3 font-semibold text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories.length > 0 ? (
                  categories.map((cat, index) => (
                    <tr
                      key={cat._id}
                      className={`border-b border-amber-100 ${
                        index % 2 === 0 ? "bg-amber-50" : "bg-white"
                      } hover:bg-amber-100`}
                    >
                      <td className="px-4 py-3 font-bold text-gray-800">
                        {cat.name}
                      </td>
                      <td className="px-4 py-3 font-semibold text-gray-600">
                        {cat.description || "—"}
                      </td>
                      <td className="px-4 py-3 space-x-2 text-center">
                        <button
                          onClick={() =>
                            navigate(`/admin/categories/${cat._id}`)
                          }
                          className="inline-flex items-center gap-1 px-3 py-1 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                        >
                          <FaEdit size={12} /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(cat._id)}
                          className="inline-flex items-center gap-1 px-3 py-1 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600"
                        >
                          <FaTrashAlt size={12} /> Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      className="px-4 py-6 text-center text-gray-500"
                      colSpan="3"
                    >
                      No categories found
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
};

export default AdminCategories;
