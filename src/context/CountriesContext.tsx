import { createContext, useEffect, useState } from "react";
import type { CountryDetail, CountryContextType } from "../types";

export const CountryContext = createContext<CountryContextType>({
   countries: [],
   loading: true,
   error: null,
});

export function CountryProvider({ children }: { children: React.ReactNode }) {
   const [countries, setCountries] = useState<CountryDetail[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      const fetchCountries = async () => {
         try {
            setLoading(true);
            const response = await fetch("https://restcountries.com/v3.1/all");
            const data: CountryDetail[] = await response.json();
            setCountries(data); // just store the array as-is
         } catch (error) {
            console.error("Failed to fetch countries", error);
         } finally {
            setLoading(false);
         }
      };

      fetchCountries();
   }, []);

   return (
      <CountryContext.Provider value={{ countries, loading, error }}>
         {children}
      </CountryContext.Provider>
   );
}
