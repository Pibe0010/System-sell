import { create } from "zustand";
import { AddBranches } from "../index.js";

export const useBranchesStore = create((set) => ({
  dataBranch: [],
  branchItemSelect: [],
  selectBranch: (params) => set({ branchItemSelect: params }),
  addBranches: async (params) => {
    const response = await AddBranches(params);
    set({ dataBranch: response });

    return response;
  },
}));
