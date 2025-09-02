import { create } from "zustand";
import axios from "axios";

export const useProductStore = create((set, get) => ({
  products: [],
  total: 0,
  limit: 10,
  skip: 0,
  search: "",
  filter: "",
  loading: false,
  loadingId: null,
  deletingId: null,
  notif: { message: "", type: "success" },
  darkMode: false,
  selectedProduct: null,
  confirmDelete: null,

  // ✅ Set products langsung (SSR)
  setProducts: (products) => set({ products }),

  // ✅ toggle dark mode
  toggleDarkMode: () =>
    set((state) => {
      const newMode = !state.darkMode;
      if (typeof window !== "undefined") {
        localStorage.setItem("darkMode", newMode ? "true" : "false");
        if (newMode) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
      return { darkMode: newMode };
    }),

  // ✅ fetch products
  fetchProducts: async () => {
    const { limit, skip, search, filter } = get();
    set({ loading: true });

    let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
    if (search) url = `https://dummyjson.com/products/search?q=${search}`;
    if (filter) url = `https://dummyjson.com/products/category/${filter}`;

    try {
      const res = await axios.get(url);
      set({
        products: res.data.products,
        total: res.data.total,
        loading: false,
      });
    } catch (err) {
      set({
        notif: { message: "Gagal fetch produk", type: "error" },
        loading: false,
      });
    }
  },

  // ✅ set search & filter
  setSearch: (q) => set({ search: q }),
  setFilter: (f) => set({ filter: f }),
  setSkip: (s) => set({ skip: s }),

  // ✅ add product (dapat menerima parameter)
  addProduct: async (newProduct = null) => {
    const productToAdd = newProduct || {
      title: "New Product",
      price: 100,
      category: "laptops",
    };

    try {
      await axios.post("https://dummyjson.com/products/add", productToAdd);
      set({
        notif: { message: "Product added successfully!", type: "success" },
      });
      await get().fetchProducts();
    } catch (err) {
      set({ notif: { message: "Gagal menambah produk", type: "error" } });
    }
  },

  // ✅ edit product
  editProduct: (id, updatedData, oldData = {}) => {
    set({ loadingId: id });

    try {
      const products = get().products.map((p) =>
        p.id === id ? { ...p, ...updatedData } : p
      );

      // hitung perubahan untuk notif
      const changes = [];
      Object.keys(updatedData).forEach((key) => {
        const before = oldData?.[key] ?? "(kosong)";
        const after = updatedData[key];
        if (before !== after) {
          changes.push(`${key}: "${before}" → "${after}"`);
        }
      });

      set({
        products,
        notif: {
          message:
            changes.length > 0
              ? `Produk berhasil diperbarui (ID: ${id}): ${changes.join(", ")}`
              : `Produk ID ${id} tidak ada perubahan`,
          type: "success",
        },
        loadingId: null,
      });
    } catch (err) {
      set({
        notif: { message: `Error update produk: ${err.message}`, type: "error" },
        loadingId: null,
      });
    }
  },

  // ✅ confirm & delete product
  confirmDeleteProduct: (product) => set({ confirmDelete: product }),
  deleteProduct: async (id) => {
    try {
      set({ deletingId: id });
      const res = await axios.delete(`https://dummyjson.com/products/${id}`);
      const data = res.data;

      if (data?.isDeleted) {
        set({
          notif: { message: `Produk "${data.title}" berhasil dihapus (simulasi)`, type: "success" },
        });
        await get().fetchProducts();
      } else {
        set({ notif: { message: "Gagal menghapus produk", type: "error" } });
      }
    } catch (err) {
      set({ notif: { message: "Error saat hapus produk", type: "error" } });
    } finally {
      set({ deletingId: null, confirmDelete: null });
    }
  },

  // ✅ notification reset
  clearNotif: () => set({ notif: { message: "", type: "success" } }),

  // ✅ modal detail
  setSelectedProduct: (p) => set({ selectedProduct: p }),
}));
