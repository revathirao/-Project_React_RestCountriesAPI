import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Spinner from "../../components/Spinner/Spinner";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import type { CountryDetail } from "../../types";
import { formatNumber } from "../../utils/formatPopulation";
import formatCurrencies from "../../utils/formatCurrencies";
import formatLanguages from "../../utils/formatLanguages";
import formatNativeName from "../../utils/formatNativeName";
import BorderCountries from "../../components/BorderCountries/BorderCountries";
import "./CountryDetailsPage.css";

/**
 * CountryDetailsPage
 ** This page displays detailed information about a single country.
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

   // HOOK: Fetch main country data
   //Fetch the country data from the API using the cca3 code
   const { data, loading, error } = useFetch<CountryDetail[]>(
      `https://restcountries.com/v3.1/alpha/${cca3}`
   );

   // // Extract the country object safely for the next hook
   const country = data && Array.isArray(data) ? data[0] : null;

   //Show loader while fetching
   if (loading) return <Spinner />;

   //Show error message if fetch fails
   if (error) return <ErrorMessage message={error} />;

   // If no data, return nothing
   if (!country) return <p>Country not found</p>;

   // Format currencies, nativeName and languages using helper functions
   const currencies = formatCurrencies(country.currencies);
   const languages = formatLanguages(country.languages);
   const nativeName = formatNativeName(country);

   return (
      <div className="country-details-container">
         {/*Back button
          *Uses useNavigate(-1) to programmatically trigger the browser's back action */}
         <button className="back-btn" onClick={() => navigate(-1)}>
            &larr; Back {/* &larr-Renders a left arrow icon */}
         </button>

         {/* Country flag */}
         <div className="details-content">
            <img
               src={country.flags.svg}
               alt={country.name.common}
               className="details-flag"
            />
            {/* Country info */}
            <div className="details-info">
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

               {/*BorderCountries*/}
               <BorderCountries borderCodes={country.borders} />
            </div>
         </div>
      </div>
   );
}
