import Dashboard from "./Dashboard";
import { getProducts, getCategories } from "../../../lib/api/product";

export default async function Page() {
  // Ambil data via helper API
  const products = await getProducts(10, 0);
  const categories = await getCategories();

  return <Dashboard initialProducts={products} categories={categories} />;
}
