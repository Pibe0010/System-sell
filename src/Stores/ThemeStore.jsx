import { create } from "zustand";
import { Light, Dark } from "../Styles/themes.jsx";

export const useThemeStore = create((set, get) => ({
  theme: "light",
  themeStyle: Light,
  setTheme: () => {
    const { theme } = get();
    set({ theme: theme === "light" ? "dark" : "light" });
    set({ themeStyle: theme === "light" ? Dark : Light });
  },
}));
