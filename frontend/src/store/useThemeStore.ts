import { create } from "zustand";

export const useThemeStore = create<themeType>((set) => ({
  theme: localStorage.getItem("theme") || "coffee",
  setTheme: (theme: string) => {
    localStorage.setItem("theme", theme);
    set({ theme });
  },
}));
