"use client"
import useCartStore from "@/stores/cartStore"

export default function Cart() {
  const { items, total, removeFromCart } = useCartStore();

  return (
    <div>
      <h2>Cart</h2>
      {items.map((item) => (
        <div key={item.productId}>
          <p>{item.name}</p>
          <p>${item.price} x {item.quantity}</p>
          <button onClick={() => removeFromCart(item.productId)}>Remove</button>
        </div>
      ))}
      <h3>Total: ${total}</h3>
    </div>
  );
}
