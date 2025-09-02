"use client";

import DetailModal from "@/app/components/notifications/Modal";
import DeleteModal from "@/app/components/notifications/Delete";

export default function ProductTable({
  products,
  loading,
  loadingId,
  deletingId,
  darkMode,
  selectedProduct,
  confirmDelete,
  setSelectedProduct,
  confirmDeleteProduct,
  handleEditProduct,
  handleDelete,
}) {
  return (
    <div className={`rounded-lg shadow-lg overflow-hidden ${darkMode ? "bg-gray-800" : "bg-white"}`}>
      {loading ? (
        <div className="p-8 text-center">Memuat data...</div>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead className={`${darkMode ? "bg-gray-700 text-gray-300" : "bg-indigo-100 text-indigo-800"}`}>
            <tr>
              <th className="p-4 font-semibold">ID</th>
              <th className="p-4 font-semibold">Nama</th>
              <th className="p-4 font-semibold">Harga</th>
              <th className="p-4 font-semibold">Kategori</th>
              <th className="p-4 font-semibold">Rating</th>
              <th className="p-4 font-semibold text-center">Aksi</th>
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
                <td className="p-4 font-semibold text-green-600">${p.price}</td>
                <td className="p-4">{p.category}</td>
                <td className="p-4">{p.rating}</td>
                <td className="p-4 flex gap-2 justify-center">
                  <button
                    onClick={() => setSelectedProduct(p)}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded shadow text-sm"
                  >
                    Detail
                  </button>
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
                  <button
                    onClick={() => confirmDeleteProduct(p)}
                    disabled={deletingId === p.id}
                    className={`px-2 py-1 rounded text-white ${
                      deletingId === p.id
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    {deletingId === p.id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
