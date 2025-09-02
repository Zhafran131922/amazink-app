"use client";

import { useState, useEffect } from "react";

export default function EditProductPage({ params }) {
  const [title, setTitle] = useState("");
  const [resData, setResData] = useState(null);

  useEffect(() => {
    fetch(`/api/product/${params.id}`)
      .then((res) => res.json())
      .then((data) => setTitle(data.title));
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/product/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    const data = await res.json();
    setResData(data);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Edit Product</h1>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Product title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-yellow-600 text-white px-4 py-2 rounded">
          Update
        </button>
      </form>
      {resData && (
        <pre className="mt-4 p-2 border bg-gray-100 rounded">
          {JSON.stringify(resData, null, 2)}
        </pre>
      )}
    </div>
  );
}
