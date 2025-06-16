import { create } from "zustand";
import { AddModules } from "../index.js";

export const useModulesStore = create((set) => ({
  dataModules: [],
  addModules: async () => {
    const response = await AddModules();
    set({ dataModules: response });

    return response;
  },
}));
