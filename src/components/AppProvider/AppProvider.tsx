import { createContext, useState } from "react";
import type { Country, AppContextType } from "../../types/index";

/// Create context
export const AppContext = createContext<AppContextType | null>(null);

// AppProvider
export default function AppProvider({
   children,
}: {
   children: React.ReactNode;
}) {
   // Search input state
   const [search, setSearch] = useState("");

   // Region filter state
   const [region, setRegion] = useState("");

   /**
    * Filters a list of countries based on global search text and region selection.
    * @param countries - Array of Country objects to filter.
    * @returns A filtered array of Country objects.
    */
   const filterCountries = (countries: Country[]): Country[] => {
      return countries.filter((country) => {
         const matchesSearch = country.name.common
            .toLowerCase()
            .includes(search.toLowerCase());

         const matchesRegion = region ? country.region === region : true;

         return matchesSearch && matchesRegion;
      });
   };

   // Provide state + filter function to children
   return (
      <AppContext.Provider
         value={{ search, setSearch, region, setRegion, filterCountries }}>
         {children}
      </AppContext.Provider>
   );
}
