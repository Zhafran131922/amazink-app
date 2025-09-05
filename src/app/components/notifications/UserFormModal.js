"use client";

import { useState, useEffect } from "react";

export default function UserFormModal({ user, darkMode, open, onCancel, onSave, saving }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        age: user.age || "",
      });
    } else {
      setFormData({ firstName: "", lastName: "", age: "" });
    }
  }, [user, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-50 p-4 animate-fadeIn">
      <div
        className={`rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100 animate-scaleIn ${
          darkMode 
            ? "bg-gradient-to-br from-gray-800 to-gray-900 text-white" 
            : "bg-gradient-to-br from-white to-gray-50 text-gray-800"
        }`}
      >
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              {user ? "Edit User" : "Add User"}
            </h2>
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

          <div className="space-y-5">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 ${
                  darkMode
                    ? "bg-gray-700/50 border-gray-600 focus:border-blue-500 focus:ring-blue-500/30 placeholder-gray-400"
                    : "bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500/30 placeholder-gray-500"
                }`}
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
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 ${
                  darkMode
                    ? "bg-gray-700/50 border-gray-600 focus:border-blue-500 focus:ring-blue-500/30 placeholder-gray-400"
                    : "bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500/30 placeholder-gray-500"
                }`}
              />
            </div>
            
            <div>
              <label htmlFor="age" className="block text-sm font-medium mb-2">
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                placeholder="Enter age"
                value={formData.age}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 ${
                  darkMode
                    ? "bg-gray-700/50 border-gray-600 focus:border-blue-500 focus:ring-blue-500/30 placeholder-gray-400"
                    : "bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500/30 placeholder-gray-500"
                }`}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button
              onClick={onCancel}
              className={`px-5 py-2.5 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 font-medium ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600 focus:ring-gray-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300 focus:ring-gray-300 text-gray-800"
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
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
              ) : "Save"}
            </button>
          </div>
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