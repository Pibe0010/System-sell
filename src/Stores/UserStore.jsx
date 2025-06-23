import { create } from "zustand";
import { AddAuthIdSupabase, AddUser } from "../index.js";

export const useUserStore = create((set) => ({
  dataUser: [],
  addUser: async () => {
    const idAuth = await AddAuthIdSupabase();
    const response = await AddUser({ id_auth: idAuth });
    set({ dataUser: response });

    return response;
  },
}));
