import { create } from "zustand";
import { InsertCompany } from "../index";

export const CompanyStore = create((set) => ({
  insertCompany: async (params) => {
    const response = await InsertCompany(params);
    console.log("res company", response);
  },
}));
