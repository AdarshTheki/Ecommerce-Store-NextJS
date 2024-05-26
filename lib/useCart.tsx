import toast from 'react-hot-toast';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CartItem {
    item: ProductType;
    quantity: number;
    color?: string;
    size?: string;
}

interface CartStore {
    cartItems: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (_id: string) => void;
    increaseQuantity: (_id: string) => void;
    decreaseQuantity: (_id: string) => void;
    clearCart: () => void;
}

const useCart = create(
    persist<CartStore>(
        (set, get) => ({
            cartItems: [],
            addItem: (data) => {
                const { item, quantity, color, size } = data;
                const currentItem = get().cartItems;
                const existingItem = currentItem.find((cartItem) => cartItem.item._id === item._id);
                if (existingItem) {
                    return toast('Item already in cart', { icon: '🛒' });
                }
                set({ cartItems: [...currentItem, { item, quantity, color, size }] });
                toast.success('Item added to cart', { icon: '🛒' });
            },
            removeItem: (_id) => {
                const newCartItems = get().cartItems.filter(
                    (cartItem) => cartItem.item._id !== _id
                );
                set({ cartItems: newCartItems });
                toast.success('Item remove from cart', { icon: '🛒' });
            },
            increaseQuantity(_id) {
                const newCartItems = get().cartItems.map((cartItem) =>
                    cartItem.item._id === _id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
                set({ cartItems: newCartItems });
                toast.success('Item Quantity Increase');
            },
            decreaseQuantity(_id) {
                const newCartItems = get().cartItems.map((cartItem) =>
                    cartItem.item._id === _id
                        ? {
                              ...cartItem,
                              quantity:
                                  cartItem.quantity > 0 ? cartItem.quantity - 1 : cartItem.quantity,
                          }
                        : cartItem
                );
                set({ cartItems: newCartItems });
                toast.success('Item Quantity Decrease');
            },
            clearCart: () => set({ cartItems: [] }),
        }),
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useCart;
