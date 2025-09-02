"use client";

export default function Notification({ message, type = "success", onClose }) {
  const colors = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500",
  };

  if (!message) return null;

  return (
    <div
      className={`${colors[type]} fixed top-4 right-4 px-4 py-2 rounded-lg text-white shadow-lg z-50`}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 font-bold">
          ✖
        </button>
      </div>
    </div>
  );
}
