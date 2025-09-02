"use client";

import { renderCell } from "@/app/components/usersConfig";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function UsersDataTable({ users, visibleColumns, darkMode }) {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  return (
    <div>
      {/* Desktop Table (hidden on mobile) */}
      <div className="hidden md:block rounded-xl overflow-hidden shadow-md border">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead
              className={
                darkMode
                  ? "bg-[#1f2937] text-gray-300"
                  : "bg-gray-200 text-gray-800"
              }
            >
              <tr>
                {visibleColumns.map((col) => (
                  <th key={col} className="px-4 py-3 text-left whitespace-nowrap">
                    {col}
                  </th>
                ))}
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody className={darkMode ? "bg-[#0f1724]" : "bg-white"}>
              {users.map((u) => (
                <tr
                  key={u.id}
                  className={
                    darkMode
                      ? "border-b border-gray-800 hover:bg-[#0b1220] transition"
                      : "border-b border-gray-300 hover:bg-gray-100 transition"
                  }
                >
                  {visibleColumns.map((col) => (
                    <td key={col} className="px-4 py-3 text-sm">
                      {renderCell(u, col, darkMode)}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-sm">
                    <button
                      onClick={() => router.push(`/users/${u.id}`)}
                      className="text-blue-500 hover:underline"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}

              {users.length === 0 && (
                <tr>
                  <td
                    colSpan={visibleColumns.length + 1}
                    className="p-6 text-center text-gray-400"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards (visible only on mobile) */}
      <div className="md:hidden space-y-4">
        {users.length === 0 ? (
          <div className={`p-6 text-center rounded-lg ${
            darkMode ? "bg-gray-800 text-gray-400" : "bg-white text-gray-500"
          }`}>
            No users found.
          </div>
        ) : (
          users.map((u) => (
            <div
              key={u.id}
              className={`p-4 rounded-lg shadow ${
                darkMode
                  ? "bg-gray-800 border border-gray-700"
                  : "bg-white border border-gray-200"
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-lg">
                  {u.firstName} {u.lastName}
                </h3>
                {u.domain && (
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      darkMode
                        ? "bg-indigo-900 text-indigo-200"
                        : "bg-indigo-100 text-indigo-800"
                    }`}
                  >
                    {u.domain}
                  </span>
                )}
              </div>
              
              <div className="space-y-2 mb-4">
                {visibleColumns.map((col) => {
                  // Skip name columns as we already show them in the header
                  if (col === "Name" || col === "firstName" || col === "lastName") return null;
                  
                  return (
                    <div key={col} className="flex justify-between items-start">
                      <span className="font-medium text-sm mr-2">{col}:</span>
                      <span className="text-sm text-right">{renderCell(u, col, darkMode)}</span>
                    </div>
                  );
                })}
              </div>
              
              <button
                onClick={() => router.push(`/users/${u.id}`)}
                className={`w-full py-2 rounded-lg text-center ${
                  darkMode
                    ? "bg-indigo-700 hover:bg-indigo-600 text-white"
                    : "bg-indigo-100 hover:bg-indigo-200 text-indigo-800"
                }`}
              >
                View Details
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}