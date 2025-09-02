"use client";

import { useEffect, useState } from "react";
import Navbar from "@/app/components/navbar";
import Notification from "@/app/components/notifications/Notification";
import { useProductStore } from "@/app/store/productStore";
import ProductTable from "@/app/components/productTable";
import Pagination from "@/app/components/Pagination";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import { fetchProducts, fetchCategories } from "../../../lib/api/product";

export default function Dashboard({ initialProducts, categories }) {
  const {
    products,
    total,
    limit,
    skip,
    search,
    filter,
    loading,
    loadingId,
    deletingId,
    notif,
    darkMode,
    selectedProduct,
    toggleDarkMode,
    fetchProducts,
    setSearch,
    setFilter,
    setSkip,
    addProduct,
    editProduct,
    confirmDeleteProduct,
    deleteProduct,
    setSelectedProduct,
    clearNotif,
    setProducts,
    fetchProducts: storeFetchProducts,
  } = useProductStore();

  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const fetchUserData = async () => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) {
        router.push("/login");
        return;
      }

      const response = await axios.get("https://dummyjson.com/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user data", error);
      Cookies.remove("accessToken");
      router.push("/login");
    }
  };

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (!token) {
      router.push("/login");
    } else {
      fetchUserData();
    }
  }, [router]);

  useEffect(() => {
    if (products.length === 0) {
      setProducts(initialProducts.products);
    }
  }, [initialProducts, setProducts, products.length]);

  // Pagination state
  const totalPages = Math.ceil(total / limit);
  const [currentPage, setCurrentPage] = useState(1);

  // Update skip when page changes
  useEffect(() => {
    const newSkip = (currentPage - 1) * limit;
    setSkip(newSkip);
    fetchProducts();
  }, [currentPage, limit, setSkip, fetchProducts]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSkip(0);
    setCurrentPage(1);
    fetchProducts();
  };

  const handleAddProduct = () => {
    const newProduct = {
      id: Date.now(),
      title: "Produk Baru",
      price: Math.floor(Math.random() * 100) + 1,
      category: "misc",
      rating: 5,
      stock: 50,
      description: "Produk baru dummy",
      thumbnail: "https://via.placeholder.com/150",
    };
    addProduct(newProduct);
  };

  const handleEditProduct = (id, updates, oldProduct) => {
    editProduct(id, { ...oldProduct, ...updates });
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
      }`}
    >
      <Navbar darkMode={darkMode} setDarkMode={toggleDarkMode} user={user} />

      <Notification
        message={notif.message}
        type={notif.type}
        onClose={clearNotif}
      />

      <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          {user && (
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Hello, {user.firstName}!
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Welcome to your product dashboard
              </p>
            </div>
          )}

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h1 className="text-2xl md:text-3xl font-bold flex items-center">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-lg mr-3">
                📦
              </span>
              Product Dashboard
            </h1>

            <div className="text-sm px-4 py-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200">
              Total Products: <span className="font-semibold">{total}</span>
            </div>
          </div>
        </div>

        {/* Search + Filter + Add Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 border border-gray-100 dark:border-gray-700">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch">
            <form
              onSubmit={handleSearch}
              className="flex-1 flex flex-col sm:flex-row gap-3"
            >
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200 ${
                    isSearchFocused
                      ? "border-indigo-500 ring-2 ring-indigo-500/20"
                      : "border-gray-300 dark:border-gray-700"
                  } ${
                    darkMode
                      ? "bg-gray-900 text-white placeholder-gray-400"
                      : "bg-white text-gray-900 placeholder-gray-500"
                  }`}
                />
              </div>
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg shadow transition-colors flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Search
              </button>
            </form>

            <div className="flex flex-col sm:flex-row gap-3">
              <select
                className={`px-4 py-3 rounded-lg border ${
                  darkMode
                    ? "bg-gray-900 border-gray-700 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((cat, idx) => (
                  <option
                    key={idx}
                    value={typeof cat === "string" ? cat : cat.slug}
                  >
                    {typeof cat === "string" ? cat : cat.name || cat.slug}
                  </option>
                ))}
              </select>

              <button
                onClick={handleAddProduct}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-3 rounded-lg shadow transition-all flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Product
              </button>
            </div>
          </div>
        </div>

        {/* Product Table Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
          <ProductTable
            products={products}
            loading={loading}
            loadingId={loadingId}
            deletingId={deletingId}
            darkMode={darkMode}
            selectedProduct={selectedProduct}
            confirmDelete={confirmDelete}
            setSelectedProduct={setSelectedProduct}
            confirmDeleteProduct={(product) => setConfirmDelete(product)}
            handleEditProduct={handleEditProduct}
            handleDelete={handleDelete}
            setConfirmDelete={setConfirmDelete}
          />
        </div>

        {/* Pagination Section */}
        {products.length > 0 && (
          <div className="mt-6">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              darkMode={darkMode}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const [productsRes, categoriesRes] = await Promise.all([
      fetchProducts(10, 0),
      fetchCategories(),
    ]);

    return {
      props: {
        initialProducts: productsRes,
        categories: categoriesRes,
      },
    };
  } catch (err) {
    return {
      props: {
        initialProducts: { products: [], total: 0 },
        categories: [],
      },
    };
  }
}
