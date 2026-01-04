import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import AppProvider from "./components/AppProvider/AppProvider";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
   <StrictMode>
      <BrowserRouter>
         <ThemeProvider>
            <AppProvider>
               <App />
            </AppProvider>
         </ThemeProvider>
      </BrowserRouter>
   </StrictMode>
);
