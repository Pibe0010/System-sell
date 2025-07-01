import { create } from "zustand";
import { AddStockFromStorage, InsertStorage } from "../index.js";

export const useStoragesStore = create((set) => ({
  dataStorages: [],
  addStorages: async (params) => {
    const response = await AddStockFromStorage(params);
    set({ dataStorages: response });
    return response;
  },
  insertStorage: async (params) => {
    await InsertStorage(params);
  },
}));
