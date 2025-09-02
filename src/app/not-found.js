// app/not-found.js
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [darkMode, setDarkMode] = useState(false);

  // cek darkMode dari localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("darkMode");
      setDarkMode(saved === "true");
    }
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen px-4 text-center ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <h1 className="text-6xl font-extrabold mb-4">404</h1>
      <p className="text-xl mb-6">Oops! Halaman yang kamu cari tidak ditemukan.</p>
      <Link
        href="/dashboard"
        className={`px-6 py-3 rounded-lg font-medium transition ${
          darkMode
            ? "bg-indigo-600 hover:bg-indigo-700 text-white"
            : "bg-indigo-500 hover:bg-indigo-600 text-white"
        }`}
      >
        Kembali ke Dashboard
      </Link>
    </div>
  );
}
