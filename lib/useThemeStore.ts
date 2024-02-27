import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Theme = "light" | "dark";

interface ThemeStore {
  theme: Theme;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore | any>(
  persist(
    (set) => ({
      isDarkMode: true,
      toggleTheme: () =>
        set((state: any) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: "theme",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
