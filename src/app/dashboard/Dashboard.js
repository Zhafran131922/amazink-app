"use client";

import { useEffect, useState } from "react";
import Navbar from "@/app/components/navbar";
import Notification from "@/app/components/notifications/Notification";
import { useProductStore } from "@/app/store/productStore";
import ProductTable from "@/app/components/productTable";
import Pagination from "@/app/components/Pagination";

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
    confirmDelete,
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
    setConfirmDelete,
    setProducts,
  } = useProductStore();

  // Pagination state
  const totalPages = Math.ceil(total / limit);
  const [currentPage, setCurrentPage] = useState(1);

  // Initialize store with SSR data if empty
  useEffect(() => {
    if (products.length === 0) {
      setProducts(initialProducts.products);
    }
  }, [initialProducts, setProducts, products.length]);

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
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"}`}>
      <Navbar darkMode={darkMode} setDarkMode={toggleDarkMode} />

      <Notification message={notif.message} type={notif.type} onClose={clearNotif} />

      <div className="p-8">
        <h1 className="text-3xl font-extrabold mb-6 flex items-center">
          <span className="mr-2">📦</span> Dashboard Produk
        </h1>

        {/* Search + Filter + Add */}
        <div className="flex flex-wrap gap-4 mb-6 items-center">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              placeholder="Cari produk..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`px-4 py-2 rounded-lg shadow-sm w-64 ${
                darkMode
                  ? "bg-gray-800 border border-gray-700 text-white"
                  : "bg-white border border-gray-300 text-gray-900"
              }`}
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow transition"
            >
              Cari
            </button>
          </form>

          <select
            className={`px-4 py-2 rounded-lg shadow-sm ${
              darkMode
                ? "bg-gray-800 border border-gray-700 text-white"
                : "bg-white border border-gray-300 text-gray-900"
            }`}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">Semua Kategori</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={typeof cat === "string" ? cat : cat.slug}>
                {typeof cat === "string" ? cat : cat.name || cat.slug}
              </option>
            ))}
          </select>

          <button
            onClick={handleAddProduct}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg shadow transition"
          >
            ➕ Add Product
          </button>
        </div>

        {/* Product Table */}
        <ProductTable
          products={products}
          loading={loading}
          loadingId={loadingId}
          deletingId={deletingId}
          darkMode={darkMode}
          selectedProduct={selectedProduct}
          confirmDelete={confirmDelete}
          setSelectedProduct={setSelectedProduct}
          confirmDeleteProduct={confirmDeleteProduct}
          handleEditProduct={handleEditProduct}
          handleDelete={handleDelete}
          setConfirmDelete={setConfirmDelete}
        />

        {/* Pagination */}
        <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} darkMode={darkMode} />
      </div>
    </div>
  );
}

// SSR: fetch data
import axios from "axios";
export async function getServerSideProps() {
  try {
    const [productsRes, categoriesRes] = await Promise.all([
      axios.get("https://dummyjson.com/products?limit=10&skip=0"),
      axios.get("https://dummyjson.com/products/categories"),
    ]);

    return {
      props: {
        initialProducts: productsRes.data,
        categories: categoriesRes.data,
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
