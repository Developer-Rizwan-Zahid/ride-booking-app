// app/page.tsx

"use client";
import React from "react";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 text-gray-800">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">
          🚗 Ride Booking App
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Welcome to your new project — built with Next.js, Tailwind & TypeScript.
        </p>
        <a
          href="#"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Get Started
        </a>
      </div>
    </main>
  );
}
