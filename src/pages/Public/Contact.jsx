import React, { useState } from "react";
import Navbar from "../../components/UserNavbar";
import Footer from "../../components/Footer";
import { Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setSuccess("Please fill all fields.");
      return;
    }
////// can't connect to backend  ///////////////
    console.log("Form submitted:", form);
    setSuccess("Your message has been sent successfully!");

    setForm({ name: "", email: "", message: "" });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen py-10 bg-gradient-to-b from-amber-50 via-white to-amber-100">
        <div className="max-w-5xl px-6 mx-auto">
          {/* Heading */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold text-gray-800">
              Contact <span className="text-amber-600">Us</span>
            </h1>
            <p className="mt-2 font-semibold text-gray-600">
              We'd love to hear from you. Feel free to reach out anytime.
            </p>
          </div>

          {/* Contact Info + Form */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Left - Contact Info */}
            <div className="p-6 bg-white shadow-md rounded-2xl">
              <h2 className="mb-4 text-lg font-semibold text-gray-800">
                Our Store Info
              </h2>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="text-amber-600" />
                  <p className="text-gray-700">
                    WatchWave Store, MG Road, Kochi, Kerala
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="text-amber-600" />
                  <p className="text-gray-700">+91 98765 43210</p>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="text-amber-600" />
                  <p className="text-gray-700">support@watchwave.com</p>
                </div>
              </div>

              <img
                src="https://img.freepik.com/free-vector/customer-support-concept-illustration_114360-2299.jpg"
                alt="Contact"
                className="mt-6 rounded-lg"
              />
            </div>

            {/* Right - Form */}
            <form
              onSubmit={handleSubmit}
              className="p-6 bg-white shadow-md rounded-2xl"
            >
              <h2 className="mb-4 text-lg font-semibold text-gray-800">
                Send us a Message
              </h2>

              <div className="mb-4">
                <label className="block mb-1 text-gray-700">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                  placeholder="Enter your name"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 text-gray-700">Your Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                  placeholder="Enter your email"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 text-gray-700">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                  placeholder="Write your message..."
                ></textarea>
              </div>

              {success && (
                <p className="mb-3 text-sm text-center text-green-600">
                  {success}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-2 font-semibold text-white transition-all rounded-lg bg-amber-600 hover:bg-amber-700"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
