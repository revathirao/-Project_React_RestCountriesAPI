import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { Theme, ThemeContextType } from "../types/index"; // ThemeContext manages the global light/dark theme state for the application

/**
 * ThemeContext
 * Manages the global theme state (light/dark) and provides a toggle function.
 * Uses useLocalStorage hook to persist theme between reloads.
 */
export const ThemeContext = createContext<ThemeContextType>({
   theme: "light",
   toggleTheme: () => {},
});

/* ThemeProvider wraps the app and provides theme state and actions */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
   // Use custom useLocalStorage hook for the 'theme' key, default is 'light'
   const [theme, setTheme] = useLocalStorage<Theme>("theme", "light");
   //    const [theme, setTheme] = useState<Theme>(() => {
   //       const savedTheme = localStorage.getItem("theme");
   //       return savedTheme === "dark" ? "dark" : "light";
   //    });

   // Toggle between light and dark themes
   function toggleTheme() {
      setTheme((prev) => (prev === "light" ? "dark" : "light"));
   }

   return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
         {children}
      </ThemeContext.Provider>
   );
}
