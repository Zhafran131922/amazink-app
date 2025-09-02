"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./navbar";

export default function Dashboard({ initialProducts, categories }) {
  const [products, setProducts] = useState(initialProducts.products);
  const [total, setTotal] = useState(initialProducts.total);
  const [limit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Effect untuk mengatur dark mode
  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  const fetchProducts = async () => {
    setLoading(true);
    let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
    if (search) url = `https://dummyjson.com/products/search?q=${search}`;
    if (filter) url = `https://dummyjson.com/products/category/${filter}`;

    const res = await axios.get(url);
    setProducts(res.data.products);
    setTotal(res.data.total);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [skip, filter]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  const handleAddProduct = async () => {
    const newProduct = {
      title: "New Product",
      price: 100,
      category: "laptops",
    };
    const res = await axios.post(
      "https://dummyjson.com/products/add",
      newProduct
    );
    alert("Product added (dummy): " + JSON.stringify(res.data));
  };

  const handleEditProduct = async (id) => {
    const updatedProduct = {
      title: "Updated Product Name",
    };
    const res = await axios.put(
      `https://dummyjson.com/products/${id}`,
      updatedProduct
    );
    alert("Product updated (dummy): " + JSON.stringify(res.data));
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800'}`}>
      {/* Navbar */}
       <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Main Content */}
      <div className="p-8">
        <h1 className="text-3xl font-extrabold mb-6 flex items-center">
          <span className="mr-2">📦</span> Dashboard Produk
        </h1>

        {/* Search & Filter */}
        <div className="flex flex-wrap gap-4 mb-6 items-center">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari produk..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'} focus:border-indigo-500 focus:ring focus:ring-indigo-200 px-4 py-2 rounded-lg shadow-sm w-64 pl-10`}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium shadow transition-colors"
            >
              Cari
            </button>
          </form>

          <select
            className={`border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'} px-4 py-2 rounded-lg shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200`}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">Semua Kategori</option>
            {categories.map((cat, index) => (
              <option
                key={index}
                value={typeof cat === "string" ? cat : cat.slug}
              >
                {typeof cat === "string" ? cat : cat.name || cat.slug}
              </option>
            ))}
          </select>

          <button
            onClick={handleAddProduct}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg font-medium shadow transition-all hover:shadow-lg"
          >
            ➕ Add Product
          </button>
        </div>

        {/* Table */}
        <div className={`rounded-lg shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
              <p className="mt-2">Memuat data...</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className={darkMode ? "bg-gray-700 text-gray-300" : "bg-indigo-100 text-indigo-800"}>
                <tr>
                  <th className="p-4 font-semibold">ID</th>
                  <th className="p-4 font-semibold">Nama</th>
                  <th className="p-4 font-semibold">Harga</th>
                  <th className="p-4 font-semibold">Kategori</th>
                  <th className="p-4 font-semibold">Rating</th>
                  <th className="p-4 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className={`border-b ${darkMode ? 'border-gray-700 hover:bg-gray-750' : 'hover:bg-gray-50'}`}>
                    <td className="p-4">{p.id}</td>
                    <td className="p-4 font-medium">{p.title}</td>
                    <td className="p-4 font-semibold text-green-600">
                      ${p.price}
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${darkMode ? 'bg-indigo-900 text-indigo-200' : 'bg-indigo-100 text-indigo-800'}`}>
                        {p.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {p.rating}
                      </div>
                    </td>
                    <td className="p-4 flex gap-2">
                      <button
                        className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded shadow text-sm transition-colors"
                        onClick={() => {
                          setSelectedProduct(p);
                          setShowModal(true);
                        }}
                      >
                        Detail
                      </button>
                      <button
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded shadow text-sm transition-colors"
                        onClick={() => handleEditProduct(p.id)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 gap-4">
          <button
            disabled={skip === 0}
            onClick={() => setSkip(skip - limit)}
            className={`px-4 py-2 rounded shadow transition-colors ${skip === 0 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : `${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-300 hover:bg-gray-400'} text-gray-800`}`}
          >
            ⬅ Prev
          </button>
          <span className="px-4 py-2">
            Halaman {Math.floor(skip/limit) + 1} dari {Math.ceil(total/limit)}
          </span>
          <button
            disabled={skip + limit >= total}
            onClick={() => setSkip(skip + limit)}
            className={`px-4 py-2 rounded shadow transition-colors ${skip + limit >= total 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : `${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-300 hover:bg-gray-400'} text-gray-800`}`}
          >
            Next ➡
          </button>
        </div>

        {/* Modal Detail */}
        {showModal && selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
            <div className={`rounded-xl shadow-lg w-full max-w-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-indigo-700">
                    {selectedProduct.title}
                  </h2>
                  <button 
                    onClick={() => setShowModal(false)}
                    className={`rounded-full p-1 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <img
                  src={selectedProduct.thumbnail}
                  alt={selectedProduct.title}
                  className="mb-4 rounded-lg w-full h-48 object-cover"
                />
                
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  {selectedProduct.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Harga</p>
                    <p className="font-semibold text-green-600">${selectedProduct.price}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Kategori</p>
                    <p className="font-semibold">{selectedProduct.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Rating</p>
                    <p className="font-semibold flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {selectedProduct.rating}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Stok</p>
                    <p className="font-semibold">{selectedProduct.stock}</p>
                  </div>
                </div>
                
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}