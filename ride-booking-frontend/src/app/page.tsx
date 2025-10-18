"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Hero Section */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-blue-700 mb-4"
      >
        Welcome to RideBooking 🚖
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-600 mb-8 max-w-lg"
      >
        Book rides, manage drivers, and track live locations in real-time.  
        Choose your role below to continue.
      </motion.p>

      {/* Role Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col md:flex-row gap-4"
      >
        <Link
          href="/rider"
          className="px-8 py-3 bg-blue-700 text-white rounded-2xl shadow-md hover:bg-blue-800 transition"
        >
          🚗 Continue as Rider
        </Link>

        <Link
          href="/driver"
          className="px-8 py-3 bg-green-600 text-white rounded-2xl shadow-md hover:bg-green-700 transition"
        >
          🧍 Continue as Driver
        </Link>

        <Link
          href="/admin"
          className="px-8 py-3 bg-gray-800 text-white rounded-2xl shadow-md hover:bg-gray-900 transition"
        >
          ⚙️ Admin Panel
        </Link>
      </motion.div>

      {/* Footer */}
      <footer className="mt-10 text-gray-500 text-sm">
        © {new Date().getFullYear()} RideBooking. All rights reserved.
      </footer>
    </div>
  );
}
