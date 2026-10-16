import {atom, computed} from 'nanostores';
import { persistentAtom } from '@nanostores/persistent';
import type { CartItem } from '../data/mock';

// State keranjang tersimpan di localStorage (otomatis sync antar tab)
export const cartItems = persistentAtom<CartItem[]>('cart_item', [], {
    encode: JSON.stringify,
    decode: JSON.parse,
})

//state modal keranjang (in-memory)
export const isCartOpen = atom<boolean>(false);

//computed store 
export const cartTotal = computed(cartItems, (items) => 
    items.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

//computed total
export const cartItemTotal = computed(cartItems, ( items) =>
    items.reduce((sum, item) => sum + item.quantity, 0)
);

//action / helper untuk menambahkan item ke keranjang
export const openCart = () => isCartOpen.set(true);
export const closeCart = () => isCartOpen.set(false);
export const toggleCart = () => isCartOpen.set(!isCartOpen.get());

export const addItem = (product: Omit<CartItem, 'quantity'>) => {
  const current = cartItems.get();
  const existing = current.find((item) => item.id === product.id);

  if (existing) {
    cartItems.set(
      current.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  } else {
    cartItems.set([...current, { ...product, quantity: 1 }]);
  }
  isCartOpen.set(true);
};

export const removeItem = (id: string) => {
  cartItems.set(cartItems.get().filter((item) => item.id !== id));
};

export const updateQuantity = (id: string, qty: number) => {
  if (qty <= 0) {
    removeItem(id);
    return;
  }
  cartItems.set(
    cartItems.get().map((item) =>
      item.id === id ? { ...item, quantity: qty } : item
    )
  );
};

export const clearCart = () => {
  cartItems.set([]);
};