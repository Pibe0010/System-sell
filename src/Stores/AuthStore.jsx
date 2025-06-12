import { create } from "zustand";
import { supabase } from "../Supabase/supabase.config";

export const useAuthStore = create((set) => ({
  loginGoogle: async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (data) {
    }
  },

  closeSession: async () => {
    await supabase.auth.signOut();
  },
}));
