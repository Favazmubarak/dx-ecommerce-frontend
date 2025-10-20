// import React from "react";
// import Navbar from "../../components/UserNavbar";
// import Footer from "../../components/Footer";
// import { motion } from "framer-motion";
// import { FaRegClock, FaStar, FaArrowRight } from "react-icons/fa6";
// import watch1 from "../../assets/watch1.png";
// import watch2 from "../../assets/watch2.png";
// import watch3 from "../../assets/watch3.png";

// const UserHome = () => {
//   const featured = [
//     {
//       name: "ChronoWave Classic",
//       price: "Rs.1*,999",
//       img: watch1,
//       desc: "Elegance redefined for everyday wear.",
//     },
//     {
//       name: "OceanMaster Pro",
//       price: "Rs.2*,899",
//       img: watch2,
//       desc: "Dive into precision with 100m waterproof design.",
//     },
//     {
//       name: "Midnight Racer",
//       price: "Rs.1*,999",
//       img: watch3,
//       desc: "Built for speed. Styled for sophistication.",
//     },
//   ];

//   return (
//     <>
//       <Navbar role="user" />

//       {/* Hero Section */}
//       <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-b from-black via-slate-900 to-amber-950">
//         <div className="absolute w-[700px] h-[700px]"></div>

//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="z-10 px-6 text-center text-white"
//         >
//           <div className="flex items-center justify-center gap-3 mb-4">
//             <FaRegClock size={38} className="text-amber-400 animate-spin-slow" />
//             <h1 className="text-5xl font-extrabold tracking-widest">
//               <span className="text-amber-400">Watch</span>Wave
//             </h1>
//           </div>
//           <h2 className="mb-4 text-4xl font-extrabold md:text-5xl">
//             Timeless. Elegant. Yours.
//           </h2>
//           <p className="max-w-xl mx-auto mb-6 text-lg text-gray-300">
//             Discover premium watches crafted for precision and personality.
//           </p>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="px-8 py-3 font-semibold text-white transition-all rounded-full shadow-lg bg-amber-500 hover:bg-amber-600"
//           >
//             Explore Collection
//           </motion.button>
//         </motion.div>
//       </div>

//       {/* Featured Watches */}
//       <section className="px-6 py-20 bg-white">
//         <h2 className="mb-12 text-4xl font-bold text-center text-gray-900">
//           Launching <span className="text-amber-500">Soon...</span>
//         </h2>

//         <div className="grid max-w-6xl gap-10 mx-auto md:grid-cols-3">
//           {featured.map((watch, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: i * 0.1 }}
//               className="p-6 transition-all shadow-lg bg-gradient-to-b from-white to-amber-50 rounded-2xl hover:shadow-amber-200/50 group"
//             >
//               <div className="overflow-hidden bg-white rounded-2xl">
//                 <img
//                   src={watch.img}
//                   alt={watch.name}
//                   className="object-contain w-full h-64 transition-transform duration-500 transform group-hover:scale-110"
//                 />
//               </div>
//               <div className="mt-5 text-center">
//                 <h3 className="text-xl font-bold text-gray-800">
//                   {watch.name}
//                 </h3>
//                 <p className="mt-1 text-sm text-gray-500">{watch.desc}</p>
//                 <p className="mt-1 font-mono text-sm text-red-500">{watch.status}</p>
//                 <p className="mt-3 text-lg font-semibold text-amber-600">
//                   {watch.price}
//                 </p>
//                 <div className="flex items-center justify-center gap-1 mt-2 text-amber-400">
//                   {[...Array(5)].map((_, j) => (
//                     <FaStar key={j} />
//                   ))}
//                 </div>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   className="flex items-center gap-2 px-6 py-2 mx-auto mt-5 text-white rounded-full bg-amber-500 hover:bg-amber-600"
//                 >
//                   Buy Now <FaArrowRight />
//                 </motion.button>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Parallax CTA Section */}
//       <section className="relative px-6 py-24 overflow-hidden text-center text-white bg-gradient-to-r from-amber-500 to-amber-700">
//         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-mosaic.png')] opacity-10"></div>
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="relative z-10"
//         >
//           <h2 className="mb-4 text-4xl font-extrabold">Crafted for Precision</h2>
//           <p className="max-w-2xl mx-auto mb-8 text-lg">
//             Our watches blend technology and craftsmanship to bring elegance to
//             every second of your life.
//           </p>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             className="px-8 py-3 font-semibold transition-all bg-white rounded-full text-amber-600 hover:bg-gray-100"
            
//           >
//             View All Products
//           </motion.button>
//         </motion.div>
//       </section>
//       <Footer />
//     </>
//   );
// };

// export default UserHome;
