// import React, { useEffect, useState } from "react";
// import api from "../../services/axios"; // your axios setup
// import Navbar from "../../components/AdminNavbar"; // optional
// import Footer from "../../components/Footer"; // optional

// const AdminProfile = () => {
//   const [admin, setAdmin] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     async function fetchAdmin() {
//       try {
//         const res = await api.get("/admin/profile"); // <-- backend endpoint
//         setAdmin(res.data);
//       } catch (err) {
//         setError("Failed to load admin details");
        
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchAdmin();
//   }, []);

//   if (loading)
//     return (
//       <div className="flex items-center justify-center h-screen text-lg font-semibold text-amber-600">
//         Loading admin details...
//       </div>
//     );

//   if (error)
//     return (
//       <div className="flex items-center justify-center h-screen text-lg font-semibold text-red-500">
//         {error}
//       </div>
//     );

//   return (
//     <>
//       <Navbar />

//       <div className="flex flex-col items-center min-h-screen px-6 py-12 bg-gradient-to-br from-white via-amber-50 to-amber-100">
//         <div className="w-full max-w-md p-6 bg-white border border-gray-200 shadow-md rounded-xl">
//           <div className="flex flex-col items-center">
//             <img
//               src={`http://localhost:3040${admin.profilePic}`}
//               alt="Admin Profile"
//               className="object-cover w-32 h-32 border-4 rounded-full border-amber-500"
//             />
//             <h2 className="mt-4 text-2xl font-bold text-gray-800">
//               {admin.name}
//             </h2>
//             <p className="text-gray-500">{admin.role}</p>
//           </div>

//           <div className="mt-6 space-y-3 text-gray-700">
//             <div className="flex justify-between pb-2 border-b">
//               <span className="font-semibold">Name:</span>
//               <span>{admin.name}</span>
//             </div>
//             <div className="flex justify-between pb-2 border-b">
//               <span className="font-semibold">Email:</span>
//               <span>{admin.email}</span>
//             </div>
//             <div className="flex justify-between pb-2 border-b">
//               <span className="font-semibold">Role:</span>
//               <span>{admin.role}</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default AdminProfile;
