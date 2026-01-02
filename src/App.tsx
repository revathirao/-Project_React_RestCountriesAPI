// import { useState } from "react";
import Header from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import CountryPage from "./pages/CountryDetailsPage/CountryDetailsPage";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
// import RegionPage from "./pages/RegionPage/RegionPage";
// import NotFound from "./pages/NotFound/NotFound";
import "./App.css";

function App() {
   return (
      <>
         <Header />
         <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/country/:name" element={<CountryPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            {/* <Route path="/region/:region" element={<RegionPage />} /> */}
            {/* <Route path="*" element={<NotFound />} /> */}
         </Routes>
      </>
   );
}
export default App;
