import { useState } from "react";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";

export default function Footer() {
  const [expanded, setExpanded] = useState(false);

  return (
    <footer
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className={` bottom-0 left-0 w-full bg-gradient-to-br from-amber-500 to-amber-400 text-white shadow-lg transition-all duration-500 ease-in-out z-50  ${
        expanded ? "py-5 from-bg- " : "py-3"
      }`}
    >
      <div className="flex flex-col items-center justify-between max-w-6xl gap-4 px-6 mx-auto md:flex-row">
        {/* Brand */}
        <div className="text-center md:text-left">
          <h1
            className={`font-extrabold tracking-wide cursor-pointer transition-all duration-150 ${
              expanded ? "text-3xl" : "text-2xl"
            }`}
          >
            WATCHWAVE.CO
          </h1>

          {expanded && (
            <p className="max-w-xs mt-2 transition-opacity duration-500 text-amber-50">
              Precision meets elegance — discover watches crafted to define your time in style.
            </p>
          )}
        </div>

        {/* Social Icons */}
        <div
          className={`flex gap-5 text-amber-100 transition-all duration-500 
          }`}
        >
          <a href="#" className="transition-transform hover:text-white hover:scale-110">
            <FaXTwitter size={26} />
          </a>
          <a href="#" className="transition-transform hover:text-white hover:scale-110">
            <FaFacebook size={26} />
          </a>
          <a href="#" className="transition-transform hover:text-white hover:scale-110">
            <FaInstagram size={26} />
          </a>
          <a href="#" className="transition-transform hover:text-white hover:scale-110">
            <FaGithub size={26} />
          </a>
        </div>
      </div>

      {/* Copyright */}
      {expanded && (
        <div className="py-3 mt-4 text-sm font-semibold text-center transition duration-700 text-amber-800 bg-gradient-to-tr from-white to-amber-100">
          © {new Date().getFullYear()} WATCHWAVE — All Rights Reserved
        </div>
      )}
    </footer>
  );
}
