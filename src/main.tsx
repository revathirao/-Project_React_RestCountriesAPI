// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";
import App from "./App.tsx";

// createRoot(document.getElementById("root")!).render(
//    <StrictMode>
//       <BrowserRouter basename="/-Project_React_RestCountriesAPI">
//          <ThemeProvider>
//             <App />
//          </ThemeProvider>
//       </BrowserRouter>
//    </StrictMode>
// );

ReactDOM.createRoot(document.getElementById("root")!).render(
   <React.StrictMode>
      <ThemeProvider>
         <HashRouter basename="/-Project_React_RestCountriesAPI">
            <App />
         </HashRouter>
      </ThemeProvider>
   </React.StrictMode>
);
