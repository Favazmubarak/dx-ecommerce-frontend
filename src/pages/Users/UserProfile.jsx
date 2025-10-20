import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import api from "../../services/axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await api.get("/logined");
        setUser(res.data);
        console.log(res.data);
        
      } catch (error) {
        console.error("Error fetching user:", error);
        navigate("/user/login");
      }
    }
    fetchUser();
  }, [navigate]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen text-lg text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full py-12 bg-gray-50">
      <div className="w-full max-w-3xl p-8 bg-white border shadow-lg rounded-2xl border-amber-100">

        <div className="flex flex-col items-center mb-8">
          {user.profilePic ? (
            <img
              src={user.profilePic}
              alt="Profile"
              className="object-cover w-32 h-32 border-4 rounded-full shadow-sm border-amber-500"
            />
          ) : (
            <FaUserCircle className="w-32 h-32 text-amber-600" />
          )}
          <h2 className="mt-4 text-2xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-500">Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-amber-600" />
            <span className="text-gray-700">{user.email || "Not provided"}</span>
          </div>
       
        </div>
      </div>
    </div>
  );
};

export default Profile;
