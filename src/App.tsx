// import { useState } from "react";
import Header from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
import CountiriesPage from "./pages/CountriesPage/CountriesPage";
import CountryDetailsPage from "./pages/CountryDetailsPage/CountryDetailsPage";
// import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import { CountryProvider } from "./context/CountriesContext";
// import RegionPage from "./pages/RegionPage/RegionPage";
// import NotFound from "./pages/NotFound/NotFound";
import "./App.css";

function App() {
   return (
      <>
         <Header />
         <CountryProvider>
            <Routes>
               <Route path="/" element={<CountiriesPage />} />
               <Route path="/country/:cca3" element={<CountryDetailsPage />} />
               {/* <Route path="/favorites" element={<FavoritesPage />} /> */}
               {/* <Route path="/region/:region" element={<RegionPage />} /> */}
               {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
         </CountryProvider>
      </>
   );
}
export default App;
