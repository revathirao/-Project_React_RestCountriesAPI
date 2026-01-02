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
         {/* <h2>Countries App</h2> */}
         <div className="title">Where in the world?</div>

         <button onClick={themeCtx.toggleTheme}>
            {themeCtx.theme === "light" ? "Dark" : "Light"} Mode
         </button>
      </header>
   );
}
