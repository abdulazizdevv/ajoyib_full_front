import { create, SetState } from "zustand";

type StoreState = {
  cartItems: number[];
  addToCart: (item: number[]) => void;
};

const useProductStore = create<StoreState>((set: SetState<StoreState>) => ({
  cartItems: (typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("cartId") || "[]")
    : []) as number[],
  addToCart: (item) => set({ cartItems: item }),
}));

export default useProductStore;
