import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/axios";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function FetchData() {
      try {
        const res = await api.get("/admin/users");
        setUsers(res.data.find);
        console.log(res.data.find);
      } catch (error) {
        console.log(error);
        setError("failed to fetch products");
      } finally {
        setLoading(false);
      }
    }
    FetchData();
  }, []);

  return (
    <>
       <div className="min-h-screen bg-amber-50">
      {/* Navbar */}
      <Navbar />

      <div className="max-w-6xl px-6 py-10 mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-center text-amber-600">
          Admin Dashboard — User List
        </h1>

        <div className="overflow-x-auto bg-white border shadow-lg rounded-2xl border-amber-200">
          <table className="w-full text-left border-collapse">
            <thead className="text-sm text-white uppercase bg-amber-500">
              <tr>
                <th className="px-4 py-3">Username</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="transition border-b border-amber-100 hover:bg-amber-100"
                >
                  <td className="px-4 py-3 font-serif font-bold">{user.username}</td>
                  <td className="px-4 py-3 font-medium text-amber-700">
                    {user.role}
                  </td>
                  <td className="px-4 py-3 font-semibold ">{user.email}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.status
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.status ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  );
};

export default UsersList;
