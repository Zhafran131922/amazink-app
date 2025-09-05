"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function DeleteModal({
  open,
  title,
  message,
  darkMode,
  onCancel,
  onConfirm,
  deleting,
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`rounded-xl shadow-xl w-full max-w-md ${
              darkMode ? "bg-gray-800 text-white" : "bg-white"
            }`}
          >
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">{title}</h2>
              <p className="mb-4">{message}</p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={onCancel}
                  className="px-4 py-2 rounded-lg shadow bg-gray-300 hover:bg-gray-400 text-gray-800 transition"
                >
                  Close
                </button>
                <button
                  onClick={onConfirm}
                  disabled={deleting}
                  className="px-4 py-2 rounded-lg shadow bg-red-500 hover:bg-red-600 text-white transition disabled:opacity-50"
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
