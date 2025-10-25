import React from "react";
import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-amber-50">
      <FaExclamationTriangle className="mb-6 text-6xl text-amber-500 animate-bounce" />
      <h1 className="text-5xl font-bold text-gray-800 mb-4 font-[Poppins]">
        404
      </h1>
      <p className="max-w-md mb-8 text-lg text-center text-gray-600">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 font-semibold text-white transition rounded-lg shadow bg-amber-600 hover:bg-amber-700"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFound;
