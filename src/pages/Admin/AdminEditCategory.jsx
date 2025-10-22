import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/axios";
import { FaEdit } from "react-icons/fa";
import AdminNavbar from "../../components/AdminNavbar";
import Footer from "../../components/Footer";

const AdminCategoryEdit = () => {
  const { id } = useParams();
  const [form, setForm] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.put(`/admin/categories/${id}`);
        setForm({
          name: res.data.updated.name,
          description: res.data.updated.description || "",
        });
      } catch (error) {
        console.error(error);
        setError(" Failed to load category details");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/admin/categories/${id}`, form);
      alert(" Category updated successfully!");
      navigate("/admin/categories");
    } catch (error) {
      console.error(error);
      alert(" Failed to update category. Please try again.");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen font-semibold bg-amber-50 text-amber-600">
        Loading Category...
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

      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white via-amber-50 to-amber-100">
        <div className="w-full max-w-lg p-10 bg-white border shadow-lg border-amber-100 rounded-2xl">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-100">
              <FaEdit className="text-amber-600" size={22} />
            </div>
            <h1 className="text-2xl font-extrabold text-gray-800 font-[Poppins]">
              Edit Category
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Category Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter category name"
                required
                className="w-full px-4 py-2 text-gray-800 border rounded-lg border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Write a short description..."
                rows="4"
                className="w-full px-4 py-2 text-gray-800 border rounded-lg resize-none border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => navigate("/admin/categories")}
                className="px-5 py-2 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 font-semibold text-white rounded-lg bg-amber-500 hover:bg-amber-600"
              >
                Update Category
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AdminCategoryEdit;
