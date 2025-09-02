"use client";

export default function DeleteModal({ product, darkMode, onCancel, onConfirm, deleting }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div
        className={`rounded-xl shadow-xl w-full max-w-md transition-transform transform scale-100 ${
          darkMode ? "bg-gray-800 text-white" : "bg-white"
        }`}
      >
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Konfirmasi Hapus</h2>
          <p className="mb-4">
            Apakah kamu yakin ingin menghapus produk{" "}
            <span className="font-semibold">{product.title}</span>?
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-lg shadow bg-gray-300 hover:bg-gray-400 text-gray-800 transition"
            >
              Batal
            </button>
            <button
              onClick={onConfirm}
              disabled={deleting}
              className="px-4 py-2 rounded-lg shadow bg-red-500 hover:bg-red-600 text-white transition disabled:opacity-50"
            >
              {deleting ? "Deleting..." : "Hapus"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
