// Import NavLink for navigation links and useLocation to read the current URL
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import "./Navbar.css";
export default function Navbar() {
   const themeCtx = useContext(ThemeContext);
   return (
      // Main navigation container
      <nav className={`navbar ${themeCtx?.theme}`}>
         <h2>Countries App</h2>

         {/* Unordered list for navigation items */}
         <ul>
            {/* Home navigation link */}
            <li>
               <NavLink
                  to="/" // Route path
                  end // Exact match for home route
                  className={({ isActive }) =>
                     isActive ? "active-link" : "inactive-link"
                  }>
                  Home
               </NavLink>

               <button onClick={ThemeContext?.toggleTheme}>
                  {themeCtx?.theme === "light" ? "Dark" : "Light"} Mode
               </button>
            </li>
         </ul>
      </nav>
   );
}
