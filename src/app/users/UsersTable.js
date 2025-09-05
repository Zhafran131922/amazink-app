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
import UserFormModal from "@/app/components/notifications/UserFormModal";

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
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [saving, setSaving] = useState(false);

  const debounceRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    setUsers(initialUsers, allUsers);
  }, [initialUsers, allUsers, setUsers]);

  // Cek token
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

  const handleAddUser = () => {
    setEditingUser(null);
    setShowForm(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleSaveUser = async (formData) => {
    setSaving(true);
    try {
      let res;
      if (editingUser) {
        // Simulasi update
        res = await fetch(`https://dummyjson.com/users/${editingUser.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        // Simulasi add
        res = await fetch(`https://dummyjson.com/users/add`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }
      const data = await res.json();
      console.log("Saved user:", data);

      alert(editingUser ? "User updated!" : "User added!");
      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save user");
    } finally {
      setSaving(false);
    }
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">👥 Users</h1>
<button
    onClick={handleAddUser}
    className="hidden md:flex relative overflow-hidden group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2"
  >
    <span className="relative flex items-center justify-center">
      <svg className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
      </svg>
      Add User
    </span>
  </button>

  {/* Mobile Button */}
  <button
    onClick={handleAddUser}
    className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 flex items-center justify-center z-40"
    aria-label="Add User"
  >
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
    </svg>
  </button>
        </div>

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

        {/* Users Data Table */}
        <UsersDataTable
          users={paginatedUsers}
          visibleColumns={visibleColumns}
          darkMode={darkMode}
          onEditUser={handleEditUser} // biar bisa edit
        />

        {/* Pagination */}
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          darkMode={darkMode}
        />
      </main>

      {/* Modal Add/Edit User */}
      <UserFormModal
        user={editingUser}
        darkMode={darkMode}
        open={showForm}
        onCancel={() => setShowForm(false)}
        onSave={handleSaveUser}
        saving={saving}
      />
    </div>
  );
}
