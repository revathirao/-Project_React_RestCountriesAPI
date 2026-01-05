import CountryCard from "../CountryCard/CountryCard";
import Spinner from "../Spinner/Spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import type { CountryListProps } from "../../types";

export default function CountryList({
   countries,
   loading,
   error,
}: CountryListProps) {
   if (loading) return <Spinner />;

   if (error) {
      return <ErrorMessage message={error} />;
   }

   if (countries.length === 0) {
      return <p>No countries found</p>;
   }

   return (
      <div className="country-list">
         {countries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
         ))}
      </div>
   );
}
