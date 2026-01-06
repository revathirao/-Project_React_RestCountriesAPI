// import { useState } from "react";
import Header from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
import CountiriesPage from "./pages/CountriesPage/CountriesPage";
import CountryDetailsPage from "./pages/CountryDetailsPage/CountryDetailsPage";
import "./App.css";

function App() {
   return (
      <>
         <Header />
         <Routes>
            <Route path="/" element={<CountiriesPage />} />
            <Route path="/country/:cca3" element={<CountryDetailsPage />} />
         </Routes>
      </>
   );
}
export default App;
