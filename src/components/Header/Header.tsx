// Import NavLink for navigation links
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import "./Header.css";

export default function Header() {
   const themeCtx = useContext(ThemeContext);

   if (!themeCtx) return null; // handle null for safety

   return (
      // Main navigation container
      <header className={`header ${themeCtx.theme}`}>
         <div className="header-container">
            <h1 className="logo">Where in the world?</h1>

            <button className="theme-toggle" onClick={themeCtx.toggleTheme}>
               <span className="moon">🌙</span>
               {themeCtx.theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>
         </div>
      </header>
   );
}
