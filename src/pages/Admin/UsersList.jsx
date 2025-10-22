import React, { useEffect, useState } from "react";
import Navbar from "../../components/AdminNavbar.jsx";
import Footer from "../../components/Footer.jsx";
import api from "../../services/axios";
import { FaUserShield, FaUserCheck, FaUserSlash } from "react-icons/fa";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get("/admin/users");
        setUsers(res.data.find || []);
      } catch (error) {
        console.log(error);
        setError(" Failed to fetch users");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [update]);

  async function disableUser(id) {
    try {
      await api.post(`admin/users/${id}/disable`);
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, isEnabled: false } : u))
      );

      setUpdate(!update)      
      
    } catch (error) {
      console.log(error);
      alert("Failed to disable user");
    }
  }

  async function enableUser(id) {
    try {
      await api.post(`admin/users/${id}/enable`);
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, isEnabled: true } : u))
      );

      setUpdate(!update)
    } catch (error) {
      console.log(error);
      alert("Failed to enable user");
    }
  }

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen font-semibold text-amber-600 bg-amber-50">
        Loading users...
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
      <div className="min-h-screen bg-gradient-to-b from-white via-amber-50 to-amber-100">
        <Navbar />

        <div className="px-6 py-10 mx-auto max-w-7xl">
          <div className="flex items-center justify-center mb-10 space-x-3">
            <FaUserShield className="text-4xl text-amber-600" />
            <h1 className="text-3xl font-extrabold text-center text-amber-700 font-poppins">
              User Management
            </h1>
          </div>

          <div className="overflow-x-auto bg-white border shadow-md border-amber-200 rounded-xl">
            <table className="w-full border-collapse">
              <thead className="text-sm text-white uppercase bg-amber-600">
                <tr>
                  <th className="px-6 py-3 text-left">Username</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Role</th>
                  <th className="px-6 py-3 text-center">Status</th>
                  <th className="px-6 py-3 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {users.length > 0 ? (
                  users.map((user) => 
                    (
                    <tr
                      key={user._id}
                      className="border-b border-amber-100 hover:bg-amber-50"
                    >
                      <td className="px-6 py-3 font-semibold text-gray-800">
                        {user.username}
                      </td>
                      <td className="px-6 py-3 text-gray-700">{user.email}</td>
                      <td className="px-6 py-3 text-amber-700">{user.role}</td>
                      <td className="px-6 py-3 text-center">
                        {user.status ? (
                          <span className="px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                            Active
                          </span>
                        ) : (
                          <span className="px-3 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-full">
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-3 text-center">
                        {user.status ? (
                          <button
                            onClick={() => disableUser(user._id)}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600"
                          >
                            <FaUserSlash /> Disable
                          </button>
                        ) : (
                          <button
                            onClick={() => enableUser(user._id)}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600"
                          >
                            <FaUserCheck /> Enable
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No users found
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

export default UsersList;
