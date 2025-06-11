import { create } from "zustand";
import { supabase } from "../Supabase/supabase.config";

export const useAuthStore = create((set) => ({
  loginGoogle: async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  },
  closeSession: async () => {
    await supabase.auth.signOut();
  },
}));
