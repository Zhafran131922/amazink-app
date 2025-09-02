"use client";

export default function DetailModal({ product, darkMode, onClose }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div
        className={`rounded-xl shadow-xl w-full max-w-lg ${
          darkMode ? "bg-gray-800 text-white" : "bg-white"
        }`}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{product.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-red-500 transition"
            >
              ✖
            </button>
          </div>

          {/* Thumbnail */}
          <img
            src={product.thumbnail}
            alt={product.title}
            className="mb-4 rounded-lg w-full h-48 object-cover"
          />

          {/* Description */}
          <p className="mb-4">{product.description}</p>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <p>
              <span className="font-semibold">Harga:</span> ${product.price}
            </p>
            <p>
              <span className="font-semibold">Kategori:</span> {product.category}
            </p>
            <p>
              <span className="font-semibold">Rating:</span> {product.rating}
            </p>
            <p>
              <span className="font-semibold">Stok:</span> {product.stock}
            </p>
          </div>

          {/* Footer */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
