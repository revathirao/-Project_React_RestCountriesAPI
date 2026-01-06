import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import type { CountryDetail, BorderCountriesProps } from "../../types";

export default function BorderCountries({ borderCodes }: BorderCountriesProps) {
   if (!borderCodes || borderCodes.length === 0) return null;
   //    // Extract the country object safely for the next hook
   //    const country = data && Array.isArray(data) ? data[0] : null;

   // Prepare the URL for borders.
   const borderUrl = `https://restcountries.com/v3.1/alpha?codes=${borderCodes.join(
      ","
   )}&fields=name,cca3`;

   // HOOK: Fetch border countries
   const { data: borderCountries } = useFetch<CountryDetail[]>(borderUrl);

   if (!borderCountries || borderCountries.length === 0) return null;

   return (
      <div className="border-countries">
         <strong>Border Countries:</strong>
         <div className="borders-list">
            {/*It loops through the array of border codes (e.g., ["FRA", "BEL", "DEU"]).*/}
            {borderCountries.map((borderCountry) => (
               /*Link: A React Router component that changes the URL without a full page reload.
                *to={\/country/${borderCca3}`}**: This creates a dynamic path. Clicking the "FRA" button will take the user to /country/FRA`.
                *key={borderCca3}: Essential for React's performance; it uses the unique 3-letter code to track each list item.
                *{borderCca3}This displays the 3-letter code (e.g., "USA") inside the button for the user to see.
                */
               <Link
                  key={borderCountry.cca3}
                  to={`/country/${borderCountry.cca3}`}
                  className="border-btn">
                  {borderCountry.name.common}
               </Link>
            ))}
         </div>
      </div>
   );
}
