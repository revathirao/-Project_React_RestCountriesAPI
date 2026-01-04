import { useParams, useNavigate, Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Spinner from "../../components/Spinner/Spinner";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import type { CountryDetail } from "../../types";
import { formatNumber } from "../../utils/formatPopulation";

import "./CountryDetailsPage.css";

/**
 * Helper function to safely format currencies from the API
 * * Formats currency objects into a readable string of names.
 * @example { USD: { name: "Dollar" } } -> "Dollar"
 * @param currencies - an optional object of currency codes mapping to {name, symbol}
 * @returns a string of currency names joined by commas, or "N/A" if none
 */
function formatCurrencies(currencies?: {
   [key: string]: { name: string; symbol: string };
}): string {
   if (!currencies) return "N/A";
   // Object.values-  converts the object into an array of its value
   // Convert the object into an array of currency details (ignoring the keys like 'USD')
   return (
      Object.values(currencies)
         // Extract only the 'name' property from each currency object
         .map((c) => c.name)
         .join(", ")
      //   // Combine the names into a single string separated by commas
   );
}

/**
 * Helper function to safely format languages from the API
 ** Converts a language object into a comma-separated string.
 * @param languages - Object with language codes as keys and names as values
 * @returns A formatted string or "N/A" if no languages exist
 */
function formatLanguages(languages?: { [key: string]: string }): string {
   if (!languages) return "N/A";
   return Object.values(languages).join(", ");
}

/**
 * CountryDetailsPage
 *
 * This page displays detailed information about a single country.
 * Features:
 * - Back button to navigate to the previous page
 * - Country flag
 * - Full details including population, region, subregion, capital, TLD, currencies, languages
 * - Border countries as clickable links to navigate to their details
 * * Data is fetched from the REST Countries v3.1 API using the cca3 code from URL params.
 */
export default function CountryDetailsPage() {
   // Extract the cca3 parameter from the URL
   const { cca3 } = useParams<{ cca3: string }>();

   // React Router navigate function for back button
   const navigate = useNavigate();

   // Fetch the country data from the API using the cca3 code
   const { data, loading, error } = useFetch<CountryDetail>(
      `https://restcountries.com/v3.1/alpha/${cca3}`
   );

   // Show loader while fetching
   if (loading) return <Spinner />;

   // Show error message if fetch fails
   if (error) return <ErrorMessage message={error} />;

   // If no data is returned, render null
   if (!data) return null;

   // Normalize data: extract the first element if data is an array, otherwise use data as is
   const country = Array.isArray(data) ? data[0] : data;

   // Extract native name safely

   // // nativeName is an object where keys are language codes (e.g., { "fra": { "common": "France" } })
   // const nativeNameObj = country.name.nativeName;

   // const nativeName = nativeNameObj
   //    ? // 1. Get all objects in nativeName
   //      // 2. Take the first one [0]
   //      // 3. Use '??' as a safety fallback if the property is missin
   //      Object.values(nativeNameObj)[0]?.common ?? country.name.common
   //    : country.name.common; //Fallback to default common name

   // nativeName is an object with dynamic language keys: { "fra": { "common": "France" } }
   const nativeNameObj = country.name.nativeName;

   const nativeName = nativeNameObj
      ? /*1. (Object.values(nativeNameObj) as { common: string }[]) -Tells TypeScript:this array contains objects with a common property.”
         *Without this, TypeScript assumes unknown[] → cannot read .common
         * 2.[0]?.common-Safely gets the first object’s .common name
         * 3.?. prevents crashes if the array is empty
         * 4.?? country.name.common -Fallback to the normal country name if no native name exists*/
        (Object.values(nativeNameObj) as { common: string }[])[0]?.common ??
        country.name.common
      : country.name.common; // Fallback to the top-level common name if nativeName is missing

   // Format currencies and languages using helper functions
   const currencies = formatCurrencies(country.currencies);
   const languages = formatLanguages(country.languages);

   return (
      <div className="country-details-container">
         {/* Back button
          * Uses useNavigate(-1) to programmatically trigger the browser's back action */}
         <button className="back-btn" onClick={() => navigate(-1)}>
            &larr; Back {/* &larr-Renders a left arrow icon */}
         </button>

         <div className="details-content">
            {/* Country flag */}
            <img
               src={country.flags.svg}
               alt={country.name.common}
               className="details-flag"
            />

            {/* Country info */}
            <div className="details-info">
               {/* Country name */}
               <h1>{country.name.common}</h1>

               {/* Two-column layout */}
               <div className="details-columns">
                  <div className="column-left">
                     <p>
                        <strong>Native Name:</strong> {nativeName}
                     </p>
                     <p>
                        <strong>Population:</strong>{" "}
                        {formatNumber(country.population)}
                     </p>
                     <p>
                        <strong>Region:</strong> {country.region}
                     </p>
                     <p>
                        <strong>Sub Region:</strong>{" "}
                        {country.subregion || "N/A"}
                     </p>
                     <p>
                        <strong>Capital:</strong>{" "}
                        {country.capital?.[0] || "N/A"}
                     </p>
                  </div>

                  <div className="column-right">
                     {/* The API returns TLDs as an array; we display the first one (primary) */}
                     <p>
                        <strong>Top Level Domain:</strong>{" "}
                        {country.tld?.[0] || "N/A"}
                     </p>
                     <p>
                        <strong>Currencies:</strong> {currencies}
                     </p>
                     <p>
                        <strong>Languages:</strong> {languages}
                     </p>
                  </div>
               </div>

               {/* Border countries
                * Only rendered if borders exist (islands are ignored) */}

               {country.borders && country.borders.length > 0 && (
                  <div className="border-countries">
                     <strong>Border Countries:</strong>
                     <div className="borders-list">
                        {/*It loops through the array of border codes (e.g., ["FRA", "BEL", "DEU"]).*/}

                        {country.borders.map((borderCca3: string) => (
                           /*Link: A React Router component that changes the URL without a full page reload.
*to={\/country/${borderCca3}`}**: This creates a dynamic path. Clicking the "FRA" button will take the user to /country/FRA`.
*key={borderCca3}: Essential for React's performance; it uses the unique 3-letter code to track each list item.
{borderCca3}This displays the 3-letter code (e.g., "USA") inside the button for the user to see.

*/
                           <Link
                              /* borderCca3 is the 3-letter ISO code for each neighboring country*/
                              key={borderCca3}
                              to={`/country/${borderCca3}`}
                              className="border-btn">
                              {borderCca3}
                           </Link>
                        ))}
                     </div>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}
