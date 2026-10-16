// src/hooks/useCart.ts
import { useStore } from '@nanostores/react';
import {
  cartItems,
  isCartOpen,
  cartTotal,
  cartItemTotal,
  openCart,
  closeCart,
  toggleCart,
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
} from '../store/cart';

export function useCart() {
  const items = useStore(cartItems);
  const isOpen = useStore(isCartOpen);
  const total = useStore(cartTotal);
  const itemCount = useStore(cartItemTotal);

  return {
    items,
    isOpen,
    total,
    itemCount,
    openCart,
    closeCart,
    toggleCart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };
}