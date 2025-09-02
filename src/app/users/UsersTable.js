"use client";

import { useEffect, useState, useRef } from "react";
import { useUsersStore } from "@/app/store/usersStore";
import Navbar from "@/app/components/navbar";
import Pagination from "@/app/components/Pagination";
import {
  ITEMS_PER_PAGE,
  getVisibleColumns,
} from "@/app/components/usersConfig";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import UsersDataTable from "@/app/components/usersTable";

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
    toggleDarkMode,
    setCurrentPage,
    getFilteredUsers,
    getFilterValues,
  } = store;

  const [localQuery, setLocalQuery] = useState(query);
  const debounceRef = useRef(null);
  const router = useRouter();
  

  useEffect(() => {
    setUsers(initialUsers, allUsers);
  }, [initialUsers, allUsers, setUsers]);

  // Cek token, kalau tidak ada redirect ke login
  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

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
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
      }`}
    >
      <Navbar darkMode={darkMode} setDarkMode={toggleDarkMode} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">👥 Users</h1>

        {/* Search & Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search name, email, username..."
            value={localQuery}
            onChange={handleSearch}
            className={`w-72 px-4 py-2 rounded-lg border ${
              darkMode
                ? "bg-gray-800 text-gray-200 placeholder-gray-400 border-gray-700"
                : "bg-white text-gray-900 placeholder-gray-500 border-gray-300"
            }`}
          />

          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className={`px-3 py-2 rounded-lg border ${
              darkMode
                ? "bg-gray-800 text-gray-200 border-gray-700"
                : "bg-white text-gray-900 border-gray-300"
            }`}
          >
            <option value="">Filter By</option>
            <option value="gender">Gender</option>
            <option value="department">Department</option>
            <option value="hair">Hair Color</option>
          </select>

          <div
            className={
              darkMode
                ? "ml-auto text-sm text-gray-400"
                : "ml-auto text-sm text-gray-700"
            }
          >
            Page {currentPage} of {totalPages}
          </div>
        </div>

        {/* Users Data Table (dipisahkan) */}
        <UsersDataTable
          users={paginatedUsers}
          visibleColumns={visibleColumns}
          darkMode={darkMode}
        />

        {/* Pagination */}
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          darkMode={darkMode}
        />
      </main>
    </div>
  );
}
