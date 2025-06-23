import { create } from "zustand";
import { AddCompanyFromId, InsertCompany } from "../index";

export const useCompanyStore = create((set) => ({
  dataCompany: [],
  addCompany: async (params) => {
    const response = await AddCompanyFromId(params);
    set({ dataCompany: response });
    return response;
  },

  insertCompany: async (params) => {
    const response = await InsertCompany(params);
    console.log("res company", response);
  },
}));
