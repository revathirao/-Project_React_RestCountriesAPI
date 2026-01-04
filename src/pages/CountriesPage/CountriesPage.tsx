import { useNavigate } from "react-router-dom";
// Import the custom useFetch hook created
import useFetch from "../../hooks/useFetch";
// Import the Spinner component to display a visual loading indicator (e.g., a rotating icon)
import Spinner from "../../components/Spinner/Spinner";
// Import the ErrorMessage component to display a user-friendly error alert or text if an operation fails
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { formatNumber } from "../../utils/formatPopulation";
import type { Country } from "../../types";
import "./CountriesPage.css";

export default function CountriesPage() {
   const navigate = useNavigate();

   /**
    * Call the useFetch hook
    * - data: API response
    * - loading: true while fetching
    * - error: error message if fetch fails
    */
   const { data, loading, error } = useFetch<Country[]>(
      "https://restcountries.com/v3.1/all?fields=name,cca3,region,flags,population,capital"
   );

   // Show loading message while API request is in progress
   if (loading) {
      return <Spinner />;
   }

   // Show error message if the fetch fails
   if (error) return <ErrorMessage message={error} />;
   // If there is no data then null
   if (!data) return null;

   return (
      <div className="countries-container">
         {/* ARRAY MAPPING:
          * We call .map() on the 'data' array. This iterates over every country object
          * inside the array and returns a new piece of JSX (UI) for each one.
          */}
         {data.map((country: Country) => (
            /*
             *THE UNIQUE KEY:
             *The 'key' attribute is mandatory in React lists. By using 'country.cca3'
             *(a unique 3-letter country code), React can efficiently track which items
             *change, are added, or are removed, preventing unnecessary re-renders.
             */
            <div
               key={country.cca3}
               className="country-card"
               onClick={() => navigate(`/country/${country.cca3}`)}>
               <img
                  src={country.flags.svg}
                  alt={country.name.common}
                  className="country-flag"
               />
               {/*
                *DATA RENDERING:
                *This accesses the 'common' property inside the 'name' object of
                *the current country and displays it as text inside the paragraph.
                */}
               <div className="country-info">
                  <h3>{country.name.common}</h3>
                  <p>
                     <strong>Population:</strong>{" "}
                     {formatNumber(country.population)}
                  </p>
                  <p>
                     <strong>Region:</strong> {country.region}
                  </p>
                  <p>
                     <strong>Capital:</strong> {country.capital?.[0]}
                  </p>
               </div>
            </div>
         ))}
      </div>
   );
}
