import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import "./Header.css";

export default function Header() {
   // Access the current theme (e.g., 'light' or 'dark') and its toggle function from the ThemeContext
   const themeCtx = useContext(ThemeContext);

   if (!themeCtx) return null; // handle null for safety

   return (
      // Main navigation container
      <header className={`header ${themeCtx.theme}`}>
         <div className="header-container">
            {/* HeaderLogo */}
            <h1 className="logo">Where in the world?</h1>

            {/* Theme toggle button */}
            <button className="theme-toggle" onClick={themeCtx.toggleTheme}>
               {/*  Moon icon SVG used to represent "Dark Mode" in the theme switcher */}
               <svg
                  className="moon-icon"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor">
                  <path d="M21.64 13a9 9 0 1 1-10.63-10.63A7 7 0 0 0 21.64 13z" />
               </svg>

               {/* Dynamically toggle the label text based on the current theme state */}
               {themeCtx.theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>
         </div>
      </header>
   );
}
