"use client";

import { useState, useEffect } from "react";

export default function EditUserModal({
  open,
  user,
  darkMode,
  onCancel,
  onConfirm,
  saving,
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        gender: user.gender || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(formData);
  };

  if (!open || !user) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex justify-center items-center z-50 p-4 animate-fadeIn">
      <div 
        className={`rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100 animate-scaleIn ${
          darkMode 
            ? "bg-gradient-to-br from-gray-800 to-gray-900 text-white" 
            : "bg-gradient-to-br from-white to-gray-50 text-gray-800"
        }`}
      >
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Edit User</h2>
            <button
              onClick={onCancel}
              className={`rounded-full h-8 w-8 flex items-center justify-center ${
                darkMode 
                  ? "hover:bg-gray-700 focus:ring-gray-500" 
                  : "hover:bg-gray-200 focus:ring-gray-300"
              } focus:outline-none focus:ring-2`}
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 ${
                  darkMode
                    ? "bg-gray-700/50 border-gray-600 focus:border-blue-500 focus:ring-blue-500/30"
                    : "bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500/30"
                }`}
                required
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 ${
                  darkMode
                    ? "bg-gray-700/50 border-gray-600 focus:border-blue-500 focus:ring-blue-500/30"
                    : "bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500/30"
                }`}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 ${
                  darkMode
                    ? "bg-gray-700/50 border-gray-600 focus:border-blue-500 focus:ring-blue-500/30"
                    : "bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500/30"
                }`}
                required
              />
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-medium mb-2">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 ${
                  darkMode
                    ? "bg-gray-700/50 border-gray-600 focus:border-blue-500 focus:ring-blue-500/30"
                    : "bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500/30"
                }`}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className={`px-5 py-2.5 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 font-medium ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600 focus:ring-gray-500"
                    : "bg-gray-200 hover:bg-gray-300 focus:ring-gray-300"
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </span>
                ) : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}