"use client";

import { useEffect, useState, useRef } from "react";
import { useUsersStore } from "@/app/store/usersStore";
import Navbar from "@/app/components/navbar";
import Pagination from "@/app/components/Pagination";
import { ITEMS_PER_PAGE, getVisibleColumns, renderBadge, renderCell } from "@/app/components/usersConfig";

export default function UsersTable({ initialUsers, allUsers }) {
  const store = useUsersStore();
  const {
    users,
    query,
    filterBy,
    filterValue,
    darkMode,
    currentPage,
    setUsers,
    setQuery,
    setFilterBy,
    setFilterValue,
    toggleDarkMode,
    setCurrentPage,
    getFilteredUsers,
    getFilterValues,
  } = store;

  useEffect(() => {
    setUsers(initialUsers, allUsers);
  }, [initialUsers, allUsers, setUsers]);

  const [localQuery, setLocalQuery] = useState(query);
  const debounceRef = useRef(null);

  const handleSearch = (e) => {
    const val = e.target.value;
    setLocalQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setQuery(val), 300);
  };

  const filteredUsers = getFilteredUsers();
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const visibleColumns = getVisibleColumns(filterBy);

  return (
    <div className={darkMode ? "min-h-screen bg-[#0e1116] text-white" : "min-h-screen bg-gray-100 text-gray-900"}>
      <Navbar darkMode={darkMode} setDarkMode={toggleDarkMode} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">👥 Users</h1>

        <div className="flex flex-wrap items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search name, email, username..."
            value={localQuery}
            onChange={handleSearch}
            className={`w-72 px-4 py-2 rounded-lg border ${darkMode ? "bg-gray-800 text-gray-200 placeholder-gray-400 border-gray-700" : "bg-white text-gray-900 placeholder-gray-500 border-gray-300"}`}
          />

          <select value={filterBy} onChange={(e) => setFilterBy(e.target.value)} className={`px-3 py-2 rounded-lg border ${darkMode ? "bg-gray-800 text-gray-200 border-gray-700" : "bg-white text-gray-900 border-gray-300"}`}>
            <option value="">Filter By</option>
            <option value="gender">Gender</option>
            <option value="department">Department</option>
            <option value="hair">Hair Color</option>
          </select>

          <select value={filterValue} onChange={(e) => setFilterValue(e.target.value)} disabled={!filterBy} className={`px-3 py-2 rounded-lg border ${darkMode ? "bg-gray-800 text-gray-200 border-gray-700" : "bg-white text-gray-900 border-gray-300"}`}>
            <option value="">Filter Value</option>
            {getFilterValues().map((val) => <option key={val} value={val}>{val}</option>)}
          </select>

          <div className={darkMode ? "ml-auto text-sm text-gray-400" : "ml-auto text-sm text-gray-700"}>
            Page {currentPage} of {totalPages}
          </div>
        </div>

        <div className={`rounded-xl overflow-hidden shadow-md border ${darkMode ? "border-gray-800" : "border-gray-300"}`}>
          <table className="w-full table-auto">
            <thead className={darkMode ? "bg-[#1f2937] text-gray-300" : "bg-gray-200 text-gray-800"}>
              <tr>
                {visibleColumns.map((col) => <th key={col} className="px-6 py-4 text-left">{col}</th>)}
              </tr>
            </thead>
            <tbody className={darkMode ? "bg-[#0f1724]" : "bg-white"}>
              {paginatedUsers.map((u) => (
                <tr key={u.id} className={darkMode ? "border-b border-gray-800 hover:bg-[#0b1220] transition" : "border-b border-gray-300 hover:bg-gray-100 transition"}>
                  {visibleColumns.map((col) => <td key={col} className="px-6 py-5 text-sm">{renderCell(u, col, darkMode)}</td>)}
                </tr>
              ))}
              {paginatedUsers.length === 0 && (
                <tr>
                  <td colSpan={visibleColumns.length} className="p-6 text-center text-gray-400">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} darkMode={darkMode} />
      </main>
    </div>
  );
}
