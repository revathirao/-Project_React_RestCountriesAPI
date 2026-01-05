import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import Search from "../../components/SearchBar/SearchBar";
import FilterDropdown from "../../components/FilterDropdown/FilterDropdown";
import CountryList from "../../components/CountryList/CountryList";
import type { Country } from "../../types";
import "./CountriesPage.css";

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
      if (!search) return countries;

      const regex = new RegExp(`^${search}`, "i"); // ^ = start of string, i = case-insensitive
      return countries.filter((country) => regex.test(country.name.common));
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
         <div className="controls">
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
