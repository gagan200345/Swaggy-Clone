import { useContext } from "react";
import { CartContext } from "./cartStore";

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart ko CartProvider ke andar use karo");
  }
  return context;
}