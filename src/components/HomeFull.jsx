import React from "react";
import Footer from "./Footer";
import LatestCollection from "./LatestCollection";
import ExploreCategories from "./ExploreCategories";

const HomeFull = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* 🕰️ Hero Section */}
      <section className="relative flex flex-col-reverse items-center justify-between px-6 py-16 overflow-hidden sm:flex-row sm:px-[6vw] md:px-[8vw] lg:px-[10vw] bg-gradient-to-r from-amber-50 via-white to-amber-100">
        {/* Left Text Section */}
        <div className="w-full sm:w-1/2 flex flex-col items-start text-[#2d2d2d] space-y-6">
          <h1 className="font-serif text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Timeless <span className="text-amber-600">Elegance</span>
            <br /> on Your Wrist
          </h1>

          <p className="text-base text-gray-600 sm:text-lg">
            Discover premium watches that define your style. From modern
            chronographs to classic analogs — precision meets personality at{" "}
            <span className="font-semibold text-amber-600">WatchWave</span>.
          </p>

          <button
            onClick={() => (window.location.href = "/products")}
            className="px-6 py-3 text-sm font-semibold text-white transition-all duration-300 rounded-full bg-amber-600 hover:bg-amber-700 hover:shadow-md"
          >
            Explore Collection
          </button>
        </div>

        {/* Right Side Image */}
        <div className="relative flex justify-center w-full mb-10 sm:w-1/2 sm:mb-0">
          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"
            alt="Luxury Watch Display"
            className="object-contain w-[90%] max-w-md transition-transform duration-700 hover:scale-105 drop-shadow-xl"
          />
        </div>
      </section>

      {/* 🪄 Latest Collection Section */}
      <section className="px-6 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-white">
        <div className="py-8 text-center">
          {/* <h2 className="text-3xl font-semibold text-gray-800">
            Our <span className="text-amber-600">Latest Collection</span>
          </h2> */}
          <p className="mt-2 text-sm text-gray-600">
            Explore new arrivals — crafted with precision, designed for passion.
          </p>
        </div>
        <LatestCollection />
      </section>

      {/* ⌚ Explore Categories */}
      <section className="px-6 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-amber-50/30">
        <div className="py-8 text-center">
          <h2 className="text-3xl font-semibold text-gray-800">
            Explore <span className="text-amber-600">Categories</span>
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Find your perfect match — classic, modern, or sporty timepieces.
          </p>
        </div>
        <ExploreCategories />
      </section>

    </div>
  );
};

export default HomeFull;
