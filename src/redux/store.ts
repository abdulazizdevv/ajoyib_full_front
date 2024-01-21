import { Translations } from "@/types/langType";
import { create } from "zustand";

type State<T> = {
  header: string | null;
  dictionary: T;
};

type Actions<T> = {
  updateDictionary: (newDictionary: T) => void;
  updateHeader: (newHeader: string | null) => void;
};

type StoreType<T> = State<T> & Actions<T>;

export const useSetStore = create<StoreType<Translations>>((set) => ({
  header: null,
  dictionary: {} as Translations,
  updateDictionary: (newDictionary) =>
    set((state) => ({ ...state, dictionary: newDictionary })),
  updateHeader: (newHeader) =>
    set((state) => ({ ...state, header: newHeader })),
}));