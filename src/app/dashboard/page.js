import Dashboard from "./Dashboard";

export default async function Page() {
  // ambil data dari API (SSR)
  const resProducts = await fetch("https://dummyjson.com/products?limit=10&skip=0");
  const products = await resProducts.json();

  const resCategories = await fetch("https://dummyjson.com/products/categories");
  const categories = await resCategories.json();

  // kirim data ke client component
  return <Dashboard initialProducts={products} categories={categories} />;
}
