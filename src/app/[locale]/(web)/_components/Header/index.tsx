"use client"
import Link from "next/link";
import useCartStore from "@/stores/cartStore"

const Header = () => {
  const totalQuantity = useCartStore((state) => state.totalQuantity);

  return (
    <header className="flex justify-between items-center px-4 py-2 shadow-md">
      <h1 className="text-xl font-bold">E-Commerce</h1>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/shop" className="ml-4">Shop</Link>
        <Link href="/cart" className="ml-4">
          Cart <span>({totalQuantity})</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
