"use client";

import { useState } from "react";

export default function AddProductPage() {
  const [title, setTitle] = useState("");
  const [resData, setResData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("https://dummyjson.com/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    const data = await res.json();
    setResData(data);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Add Product</h1>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Product title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Add
        </button>
      </form>
      {resData && (
        <pre className="mt-4 p-2 border bg-gray-100 rounded">{JSON.stringify(resData, null, 2)}</pre>
      )}
    </div>
  );
}
