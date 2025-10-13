import React from "react";
import logo from "../assets/download.png"

const Navbar = () => {

  return(
  <>
   <nav className="z-50 flex flex-col items-center justify-between px-3 bg-white shadow-md lg:flex-row" >
    <div className="flex items-center space-x-2">
        <img className="w-20 h-20" src={logo} alt="" />
       <h1 className="text-2xl font-extrabold ">
             <span className="text-amber-600">Watch</span>
             <span className="font-normal text-gray-700 ">-Wave</span>
          </h1> 
    </div>

           <div className="flex items-center space-x-6">
           <label className="relative items-center hidden cursor-pointer lg:inline-flex">
             <input type="checkbox" value="" className="sr-only peer" />
             <div className=" lg:w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
           </label>
           
           <ul className="flex items-center space-x-6 font-medium text-gray-700">
             <li className="cursor-pointer hover:text-amber-600">Home</li>
             <li className="cursor-pointer hover:text-amber-600">Product</li>
             <li className="cursor-pointer hover:text-amber-600">
               Category
             </li>
             <li className="relative cursor-pointer hover:text-yellow-500 group">
               Contact
             </li>
           </ul>
         </div>
    
  </nav>
  </>)
 
};

export default Navbar;

  // <nav className="flex items-center justify-between px-6 py-3 bg-white shadow-md rounded-b-2xl">
  //       {/* Left: Logo and Title */}
  //       <div className="flex items-center space-x-2">
  //         <img src={logo} alt="logo" className="w-10 h-10" />
  //         <h1 className="font-mono text-2xl font-extrabold">
  //           <span className="text-yellow-500">C</span> Watch{" "}
  //           <span className="font-normal">Store</span>
  //         </h1>
  //       </div>

  //       {/* Middle: Toggle Button */}
  //       <div className="flex items-center space-x-6">
  //         <label className="relative inline-flex items-center cursor-pointer">
  //           <input type="checkbox" value="" className="sr-only peer" />
  //           <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
  //         </label>

  //         {/* Right: Links */}
  //         <ul className="flex items-center space-x-6 font-medium text-gray-700">
  //           <li className="cursor-pointer hover:text-yellow-500">Home</li>
  //           <li className="cursor-pointer hover:text-yellow-500">
  //             Best Seller
  //           </li>
  //           <li className="relative cursor-pointer hover:text-yellow-500 group">
  //             Quick Links
  //             <ul className="absolute hidden w-32 mt-2 bg-white rounded-lg shadow-md group-hover:block">
  //               <li className="px-4 py-2 cursor-pointer hover:bg-yellow-100">
  //                 About
  //               </li>
  //               <li className="px-4 py-2 cursor-pointer hover:bg-yellow-100">
  //                 Contact
  //               </li>
  //             </ul>
  //           </li>
  //         </ul>

  //         {/* Cart Icon */}
  //         <ShoppingCart className="cursor-pointer hover:text-yellow-500" />
  //       </div>
  //     </nav>
  //     );