import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark";

interface ThemeStore {
  theme: Theme;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore | any>(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleTheme: () =>
        set((state: any) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: "theme",
      getStorage: () => sessionStorage,
    }
  )
);
