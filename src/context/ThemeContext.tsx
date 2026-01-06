import { createContext,    useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
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

   /**
    * Switches between light and dark theme.
    * Updates both React state and localStorage via the hook.
    */
   function toggleTheme() {
      setTheme((prev) => (prev === "light" ? "dark" : "light"));
   }

   useEffect(() => {
      document.documentElement.setAttribute("data-theme", theme);
   }, [theme]);
   return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
         {children}
      </ThemeContext.Provider>
   );
}
