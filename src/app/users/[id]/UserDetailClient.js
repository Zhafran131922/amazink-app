"use client";

import { useEffect, useState } from "react";
import Navbar from "@/app/components/navbar";
import DeleteModal from "@/app/components/notifications/DeleteUser";
import EditUserModal from "@/app/components/notifications/EditUser";

export default function UserDetailClient({ user, todos, carts, posts }) {
  const [darkMode, setDarkMode] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [saving, setSaving] = useState(false);

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

  const handleEditUser = async (updatedData) => {
    try {
      setSaving(true);
      const res = await fetch(`https://dummyjson.com/users/${user.id}`, {
        method: "PUT", // atau PATCH
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) throw new Error("Failed to update user");
      const data = await res.json();
      console.log("User updated:", data);

      alert(`User ${data.firstName} ${data.lastName} updated!`);
      setShowEdit(false);
      // bisa juga refresh page / update state user
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update user!");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteUser = async () => {
    try {
      setDeleting(true);
      const res = await fetch(`https://dummyjson.com/users/${user.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete user");

      const data = await res.json();
      console.log("User deleted:", data);

      alert(`User ${data.firstName} ${data.lastName} deleted!`);
      setShowDelete(false);
      window.history.back(); // balik ke list users
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete user!");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
      }`}
    >
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="p-8 max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-6">👤 User Details</h1>

        {/* User Info */}
        <div
          className={`rounded-lg shadow-lg p-6 mb-8 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <p className="mb-3">
            <strong>Name:</strong> {user.firstName} {user.lastName}
          </p>
          <p className="mb-3">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="mb-3">
            <strong>Gender:</strong> {user.gender}
          </p>
          <p className="mb-3">
            <strong>Department:</strong> {user.company.department}
          </p>
          <p className="mb-3">
            <strong>Address:</strong> {user.address.address},{" "}
            {user.address.city}
          </p>
        </div>

        {/* Todos */}
        <h2 className="text-2xl font-semibold mb-4">✅ Todos</h2>
        <ul className="list-disc ml-6 mb-8">
          {todos?.todos?.length > 0 ? (
            todos.todos.map((todo) => (
              <li
                key={todo.id}
                className={todo.completed ? "text-green-600" : "text-red-600"}
              >
                {todo.todo}
              </li>
            ))
          ) : (
            <p className="text-gray-500">No todos available.</p>
          )}
        </ul>

        {/* Carts */}
        <h2 className="text-2xl font-semibold mb-4">🛒 Carts</h2>
        {carts?.carts?.length > 0 ? (
          carts.carts.map((cart) => (
            <div
              key={cart.id}
              className="border dark:border-gray-700 p-4 mb-4 rounded-lg"
            >
              <p>Total Products: {cart.totalProducts}</p>
              <p>Total Price: ${cart.total}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 mb-8">No carts found.</p>
        )}

        {/* Posts */}
        <h2 className="text-2xl font-semibold mb-4">📝 Posts</h2>
        {posts?.posts?.length > 0 ? (
          posts.posts.map((post) => (
            <div
              key={post.id}
              className="border dark:border-gray-700 p-4 mb-4 rounded-lg"
            >
              <h3 className="font-bold">{post.title}</h3>
              <p>{post.body}</p>
              <p className="text-sm text-gray-500">
                Likes: {post.reactions.likes}, Dislikes:{" "}
                {post.reactions.dislikes}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No posts available.</p>
        )}

        {/* Buttons */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={() => window.history.back()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow transition-colors"
          >
            ⬅ Back to Users
          </button>

          <button
            onClick={() => setShowDelete(true)}
            className="px-4 py-2 rounded-lg shadow bg-red-500 hover:bg-red-600 text-white transition"
          >
            Delete
          </button>

          <button
            onClick={() => setShowEdit(true)}
            className="px-4 py-2 rounded-lg shadow bg-yellow-500 hover:bg-yellow-600 text-white transition"
          >
            ✏ Edit
          </button>
        </div>

        {/* Delete Modal */}
        <DeleteModal
          open={showDelete}
          title="Delete Confirmation"
          message={`Are you sure you want to delete ${user.firstName} ${user.lastName}?`}
          darkMode={darkMode}
          onCancel={() => setShowDelete(false)}
          onConfirm={handleDeleteUser}
          deleting={deleting}
        />

        <EditUserModal
          open={showEdit}
          user={user}
          darkMode={darkMode}
          onCancel={() => setShowEdit(false)}
          onConfirm={handleEditUser}
          saving={saving}
        />
      </div>
    </div>
  );
}
