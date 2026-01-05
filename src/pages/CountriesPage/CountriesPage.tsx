// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// // Import the custom useFetch hook created
// import useFetch from "../../hooks/useFetch";
// // Import the Spinner component to display a visual loading indicator (e.g., a rotating icon)
// import Spinner from "../../components/Spinner/Spinner";
// // Import the ErrorMessage component to display a user-friendly error alert or text if an operation fails
// import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
// import { formatNumber } from "../../utils/formatPopulation";
// import type { Country } from "../../types";
// import "./CountriesPage.css";
// import type React from "react";

// export default function CountriesPage() {
//    const navigate = useNavigate();

//    /**
//     * Call the useFetch hook
//     * - data: API response
//     * - loading: true while fetching
//     * - error: error message if fetch fails
//     */
//    const { data, loading, error } = useFetch<Country[]>(
//       "https://restcountries.com/v3.1/all?fields=name,cca3,region,flags,population,capital"
//    );

//    const [search, setSearch] = useState("");

//    // Show loading message while API request is in progress
//    if (loading) {
//       return <Spinner />;
//    }

//    // Show error message if the fetch fails
//    if (error) return <ErrorMessage message={error} />;
//    // If there is no data then null
//    if (!data) return null;

//    return (
//       <div className="countries-container">
//          {/* ARRAY MAPPING:
//           * We call .map() on the 'data' array. This iterates over every country object
//           * inside the array and returns a new piece of JSX (UI) for each one.
//           */}
//          {data.map((country: Country) => (
//
//             <div
//                key={country.cca3}
//                className="country-card"
//                onClick={() => navigate(`/country/${country.cca3}`)}>
//                <img
//                   src={country.flags.svg}
//                   alt={country.name.common}
//                   className="country-flag"
//                />
//                {/*
//                 *DATA RENDERING:
//                 *This accesses the 'common' property inside the 'name' object of
//                 *the current country and displays it as text inside the paragraph.
//                 */}
//                <div className="country-info">
//                   <h3>{country.name.common}</h3>
//                   <p>
//                      <strong>Population:</strong>{" "}
//                      {formatNumber(country.population)}
//                   </p>
//                   <p>
//                      <strong>Region:</strong> {country.region}
//                   </p>
//                   <p>
//                      <strong>Capital:</strong> {country.capital?.[0]}
//                   </p>
//                </div>
//             </div>
//          ))}
//       </div>
//    );
// }

import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import Search from "../../components/SearchBar/SearchBar";
import FilterDropdown from "../../components/FilterDropdown/FilterDropdown";
import CountryList from "../../components/CountryList/CountryList";
import type { Country } from "../../types";
export default function CountriesPage() {
   const [search, setSearch] = useState("");
   const [region, setRegion] = useState("");

   /**
    * Call the useFetch hook
    * - data: API response
    * - loading: true while fetching
    * - error: error message if fetch fails
    */
   const {
      data = [],
      loading,
      error,
   } = useFetch<Country[]>(
      "https://restcountries.com/v3.1/all?fields=name,cca3,region,flags,population,capital"
   );

   // Use data OR empty array
   // Ensures we are always working with an array, even if data is null
   const countries = data ?? []; // countries is now always Country[]

   // Filter by search
   /*** Filters the country list based on the user's search query.
    ** @param countries - The full list of country objects
    * @param search - The search string to match against common names
    * @returns A filtered array of countries
    */
   function filterBySearch(countries: Country[], search: string) {
      return countries.filter((country) =>
         country.name.common.toLowerCase().includes(search.toLowerCase())
      );
   }

   // Filter by region
   /*** Filters the country list based on a specific geographic region.
    ** @param countries - The list of countries (usually already filtered by search)
    * @param region - The region string (e.g., "Europe"); if empty, no filter is applied
    * @returns A filtered array of countries
    */
   function filterByRegion(countries: Country[], region: string) {
      if (!region) return countries;
      return countries.filter((country) => country.region === region);
   }

   // Apply filters
   // Derives the final list by chaining the search and region filter functions
   const filteredCountries = filterByRegion(
      filterBySearch(countries, search), // Step 1: Filter by text
      region // Step 2: Filter that result by region
   );

   return (
      <div className="countries-container">
         <div className="filter-container">
            {/* Input component to update the search state */}
            <Search value={search} onChange={setSearch} />

            {/* Dropdown component to update the region state */}
            <FilterDropdown value={region} onChange={setRegion} />
         </div>

         {/* Displays the loading spinner, error message, or the list of country cards */}
         <CountryList
            countries={filteredCountries}
            loading={loading}
            error={error}
         />
      </div>
   );
}
