import { useNavigate } from "react-router-dom";
import { formatNumber } from "../../utils/formatPopulation";
import type { CountryCardProps } from "../../types";

export default function CountryCard({ country }: CountryCardProps) {
   const navigate = useNavigate();

   return (
      <div
         className="country-card"
         role= "button"
         /*
          *Clicking the card triggers navigation to a dynamic route.
          *It uses the country's unique 3-letter code (cca3) as a URL parameter.
          */
         onClick={() => navigate(`/country/${country.cca3}`)}>
         {/* Displays the country's flag image using a vector source for high resolution*/}
         <img
            src={country.flags.svg} // URL to the .svg flag image from the API
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
               <strong>Population:</strong> {formatNumber(country.population)}
            </p>
            <p>
               <strong>Region:</strong> {country.region}
            </p>
            <p>
               <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
            </p>
         </div>
      </div>
   );
}
