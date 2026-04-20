"use client";

import { CartItemWithProduct, setProductQuantity } from "@/lib/actions";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

interface CartEntryProps {
  cartItem: CartItemWithProduct;
}
export default function CartEntry({ cartItem }: CartEntryProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleIncrement = async () => {
    setIsLoading(true);
    try {
      await setProductQuantity(cartItem.product.id, cartItem.quantity + 1);
    } catch (error) {
      console.error("Error incrementing cart item:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDecrement = async () => {
    setIsLoading(true);
    try {
      await setProductQuantity(cartItem.product.id, cartItem.quantity - 1);
    } catch (error) {
      console.error("Error decrementing cart item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <li className="border-b border-muted flex py-4 justify-between">
      <div className="flex space-x-4">
        <div className="overflow-hidden rounded-md border border-muted w-16 h-16">
          {cartItem.product.image && (
            <Image
              className="h-full w-full object-cover"
              width={128}
              height={128}
              src={cartItem.product.image}
              alt={cartItem.product.name}
            />
          )}
        </div>
        <div className="flex flex-col">
          <div className=" font-medium">{cartItem.product.name}</div>
        </div>
      </div>

      <div className="flex flex-col justify-between items-end gap-2">
        <p className="font-medium">{formatPrice(cartItem.product.price)}</p>

        <div className="flex items-center border border-muted rounded-full">
          <Button
            variant="ghost"
            className="rounded-l-full"
            onClick={handleDecrement}
            disabled={isLoading}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <p className="w-6 text-center">{cartItem.quantity}</p>
          <Button
            variant="ghost"
            className="rounded-r-full"
            onClick={handleIncrement}
            disabled={isLoading}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </li>
  );
}
