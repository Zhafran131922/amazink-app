"use client";

import { useEffect, useState } from "react";
import Navbar from "@/app/components/navbar"

async function getUserDetail(id) {
  const res = await fetch(`https://dummyjson.com/users/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch user detail");
  return res.json();
}

export default function UserDetail({ params }) {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Fetch user data
  useEffect(() => {
    getUserDetail(params.id).then(setUser);
  }, [params.id]);

  // Dark Mode setup
  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800"
      }`}
    >
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="p-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-6">👤 User Detail</h1>
        <div
          className={`rounded-lg shadow-lg p-6 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <p className="mb-3"><strong>Name:</strong> {user.firstName} {user.lastName}</p>
          <p className="mb-3"><strong>Email:</strong> {user.email}</p>
          <p className="mb-3"><strong>Gender:</strong> {user.gender}</p>
          <p className="mb-3"><strong>Age:</strong> {user.age}</p>
          <p className="mb-3"><strong>Company:</strong> {user.company?.name}</p>
          <p className="mb-3"><strong>Address:</strong> {user.address?.address}, {user.address?.city}</p>

          <button
            onClick={() => window.history.back()}
            className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow transition-colors"
          >
            ⬅ Back to Users
          </button>
        </div>
      </div>
    </div>
  );
}
