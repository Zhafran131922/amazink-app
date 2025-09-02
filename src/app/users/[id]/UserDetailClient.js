"use client";

import { useEffect, useState } from "react";
import Navbar from "@/app/components/navbar";

export default function UserDetailClient({ user, todos, carts, posts }) {
  const [darkMode, setDarkMode] = useState(false);

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

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
      }`}
    >
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="p-8 max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-6">👤 User Details</h1>

        <div
          className={`rounded-lg shadow-lg p-6 mb-8 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <p className="mb-3"><strong>Name:</strong> {user.firstName} {user.lastName}</p>
          <p className="mb-3"><strong>Email:</strong> {user.email}</p>
          <p className="mb-3"><strong>Gender:</strong> {user.gender}</p>
          <p className="mb-3"><strong>Department:</strong> {user.company.department}</p>
          <p className="mb-3"><strong>Address:</strong> {user.address.address}, {user.address.city}</p>
        </div>

        <h2 className="text-2xl font-semibold mb-4">✅ Todos</h2>
        <ul className="list-disc ml-6 mb-8">
          {todos.todos.length > 0 ? (
            todos.todos.map(todo => (
              <li key={todo.id} className={todo.completed ? "text-green-600" : "text-red-600"}>
                {todo.todo}
              </li>
            ))
          ) : (
            <p className="text-gray-500">No todos available.</p>
          )}
        </ul>

        <h2 className="text-2xl font-semibold mb-4">🛒 Carts</h2>
        {carts.carts.length > 0 ? (
          carts.carts.map(cart => (
            <div key={cart.id} className="border dark:border-gray-700 p-4 mb-4 rounded-lg">
              <p>Total Products: {cart.totalProducts}</p>
              <p>Total Price: ${cart.total}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 mb-8">No carts found.</p>
        )}

        <h2 className="text-2xl font-semibold mb-4">📝 Posts</h2>
        {posts.posts.length > 0 ? (
          posts.posts.map(post => (
            <div key={post.id} className="border dark:border-gray-700 p-4 mb-4 rounded-lg">
              <h3 className="font-bold">{post.title}</h3>
              <p>{post.body}</p>
              <p className="text-sm text-gray-500">
                Likes: {post.reactions.likes}, Dislikes: {post.reactions.dislikes}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No posts available.</p>
        )}

        <button
          onClick={() => window.history.back()}
          className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow transition-colors"
        >
          ⬅ Back to Users
        </button>
      </div>
    </div>
  );
}
