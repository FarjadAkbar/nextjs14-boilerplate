"use client"
import { useFetchProducts, useAddToCart } from "@/hooks/product";
import useCartStore from "@/stores/cartStore"

export default function ProductList() {
  const { data: products, isLoading, error } = useFetchProducts();
  const addToCart = useCartStore((state) => state.addToCart);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products.</p>;
  if (!products || products.length === 0) return <p>No products found.</p>;

  return (
    <div>
      {products?.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>${product.price}</p>
          <button
            onClick={() => addToCart({ productId: product.id, name: product.name, price: product.price, quantity: 1 })}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
