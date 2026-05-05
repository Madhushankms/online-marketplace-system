"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { addToCart } from "@/lib/actions";
import { Product } from "@/generated/prisma/client";
// import { useRouter } from "next/navigation";

export function AddToCartButton({ product }: { product: Product }) {
  // const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    try {
      setIsAdding(true);
      await addToCart(product.id, 1);
      // router.refresh();
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={product.inventory === 0 || isAdding}
      className="w-full cursor-pointer"
    >
      <ShoppingCart className="mr-1 w-4 h-4" />
      {product.inventory > 0 ? "Add to cart" : "Out of stock"}
    </Button>
  );
}
