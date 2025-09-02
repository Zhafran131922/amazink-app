export default async function ProductDetail({ params }) {
  const res = await fetch(`https://dummyjson.com/products/${params.id}`, { cache: "no-store" });
  const product = await res.json();

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">{product.title}</h1>
      <p className="mt-2">{product.description}</p>
      <p className="mt-2 font-semibold">Price: ${product.price}</p>
      <img src={product.thumbnail} alt={product.title} className="w-64 mt-4" />
      <div className="mt-6">
        <a href="/products" className="text-blue-500">← Back</a>
      </div>
    </div>
  );
}
