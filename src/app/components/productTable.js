"use client";

import DetailModal from "@/app/components/notifications/Modal";
import DeleteModal from "@/app/components/notifications/Delete";
import { Trash2, Eye, Edit } from "lucide-react";
import { useState, useEffect } from "react";

export default function ProductTable({
  products,
  loading,
  loadingId,
  deletingId,
  darkMode,
  selectedProduct,
  confirmDelete,
  setConfirmDelete,
  setSelectedProduct,
  confirmDeleteProduct,
  handleEditProduct,
  handleDelete,
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  return (
    <div
      className={`rounded-lg shadow-lg overflow-hidden ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      {loading ? (
        <div className="p-8 text-center">Loading...</div>
      ) : isMobile ? (
        // Mobile Card View
        <div className="p-4 space-y-4">
          {products.map((p) => (
            <div
              key={p.id}
              className={`p-4 rounded-lg border ${
                darkMode
                  ? "bg-gray-700 border-gray-600"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg">{p.title}</h3>
                  <p className="text-sm text-gray-500">ID: {p.id}</p>
                </div>
                <span className="font-semibold text-green-600">${p.price}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                <div>
                  <span className="font-medium">Category:</span>
                  <p className="capitalize">{p.category}</p>
                </div>
                <div>
                  <span className="font-medium">Rating:</span>
                  <p>{p.rating}</p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => setSelectedProduct(p)}
                  className="flex items-center text-indigo-600 hover:text-indigo-800"
                >
                  <Eye size={16} className="mr-1" />
                  Detail
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      handleEditProduct(
                        p.id,
                        { title: "Updated Name", price: "9.99" },
                        p
                      )
                    }
                    disabled={loadingId === p.id}
                    className={`flex items-center ${
                      loadingId === p.id
                        ? "text-gray-400"
                        : "text-blue-600 hover:text-blue-800"
                    }`}
                  >
                    <Edit size={16} className="mr-1" />
                    {loadingId === p.id ? "..." : "Edit"}
                  </button>

                  <button
                    onClick={() => confirmDeleteProduct(p)}
                    disabled={deletingId === p.id}
                    className={`flex items-center ${
                      deletingId === p.id
                        ? "text-gray-400"
                        : "text-red-600 hover:text-red-800"
                    }`}
                  >
                    <Trash2 size={16} className="mr-1" />
                    {deletingId === p.id ? "..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Desktop Table View
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead
              className={`${
                darkMode
                  ? "bg-gray-700 text-gray-300"
                  : "bg-indigo-100 text-indigo-800"
              }`}
            >
              <tr>
                <th className="p-4 font-semibold">ID</th>
                <th className="p-4 font-semibold">Name</th>
                <th className="p-4 font-semibold">Price</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold">Rating</th>
                <th className="p-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, idx) => (
                <tr
                  key={p.id}
                  className={`${
                    idx % 2 === 0
                      ? darkMode
                        ? "bg-gray-800"
                        : "bg-white"
                      : darkMode
                      ? "bg-gray-750"
                      : "bg-gray-50"
                  }`}
                >
                  <td className="p-4">{p.id}</td>
                  <td className="p-4 font-medium">{p.title}</td>
                  <td className="p-4 font-semibold text-green-600">
                    ${p.price}
                  </td>
                  <td className="p-4 capitalize">{p.category}</td>
                  <td className="p-4">{p.rating}</td>
                  <td className="p-4 flex gap-2 justify-center">
                    {/* Detail Button */}
                    <button
                      onClick={() => setSelectedProduct(p)}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded shadow text-sm"
                    >
                      Detail
                    </button>

                    {/* Edit Button */}
                    <button
                      onClick={() =>
                        handleEditProduct(
                          p.id,
                          { title: "Updated Name", price: "9.99" },
                          p
                        )
                      }
                      disabled={loadingId === p.id}
                      className={`px-3 py-1 rounded text-white text-sm ${
                        loadingId === p.id
                          ? "bg-gray-400"
                          : "bg-blue-500 hover:bg-blue-600"
                      }`}
                    >
                      {loadingId === p.id ? "..." : "Edit"}
                    </button>

                    {/* Delete Button (icon only) */}
                    <button
                      onClick={() => confirmDeleteProduct(p)}
                      disabled={deletingId === p.id}
                      className={`p-2 rounded-full flex items-center justify-center ${
                        deletingId === p.id
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600"
                      }`}
                      title="Delete Product"
                    >
                      {deletingId === p.id ? (
                        <span className="text-xs text-white">...</span>
                      ) : (
                        <Trash2 size={18} className="text-white" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modals */}
      <DetailModal
        product={selectedProduct}
        darkMode={darkMode}
        onClose={() => setSelectedProduct(null)}
      />
      <DeleteModal
        product={confirmDelete}
        darkMode={darkMode}
        deleting={deletingId === confirmDelete?.id}
        onCancel={() => setConfirmDelete(null)}
        onConfirm={() => handleDelete(confirmDelete.id)}
      />
    </div>
  );
}
