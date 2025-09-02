import axios from "axios";

const API_URL = "https://dummyjson.com";

// Ambil produk (dengan pagination)
export async function fetchProducts(limit = 10, skip = 0) {
  try {
    const res = await axios.get(`${API_URL}/products?limit=${limit}&skip=${skip}`);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch products:", err);
    return { products: [], total: 0 };
  }
}

// Ambil kategori produk
export async function fetchCategories() {
  try {
    const res = await axios.get(`${API_URL}/products/categories`);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch categories:", err);
    return [];
  }
}

export async function getProducts(limit = 10, skip = 0) {
  const res = await fetch(`${API_URL}/products?limit=${limit}&skip=${skip}`, {
    cache: "no-store", // agar SSR fresh
  });
  if (!res.ok) throw new Error("Gagal mengambil data produk");
  return res.json();
}

export async function getCategories() {
  const res = await fetch(`${API_URL}/products/categories`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Gagal mengambil kategori produk");
  return res.json();
}

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    const response = await fetch(`${API_URL}/products/${id}`);
    const data = await response.json();
    return res.status(200).json(data);
  }

  if (req.method === "PUT") {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    return res.status(200).json(data);
  }

  return res.status(405).json({ message: "Method not allowed" });
}


