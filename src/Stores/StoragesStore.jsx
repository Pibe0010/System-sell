import { create } from "zustand";
import { InsertStorage } from "../index.js";

export const useStoragesStore = create((set) => ({
  insertStorage: async (params) => {
    await InsertStorage(params);
  },
}));
