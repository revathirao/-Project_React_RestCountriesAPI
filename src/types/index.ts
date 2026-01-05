export type Theme = "light" | "dark";

export interface ThemeContextType {
   theme: Theme;
   toggleTheme: () => void;
}

// Holds search + region state + setters + filter function
export interface AppContextType {
   search: string;
   setSearch: (value: string) => void;
   region: string;
   setRegion: (value: string) => void;
   filterCountries: (countries: Country[]) => Country[];
}

export interface Country {
   name: {
      common: string;
      official: string;
   };
   region: string;
   population: number;
   capital?: string[];
   cca3: string;
   flags: { png: string; svg: string };
   // add more fields as needed
}

export interface CountryListProps {
   countries: Country[];
   loading: boolean;
   error?: string | null;
}

export interface CountryDetail {
   name: {
      common: string;
      official: string;
      nativeName?: {
         [key: string]: { official: string; common: string };
      };
   };

   population: number;
   region: string;
   subregion?: string;
   capital?: string[];
   tld?: string[];
   currencies?: { [key: string]: { name: string; symbol: string } };
   //Example:  "USD": { "name": "United States dollar", "symbol": "$" },
   languages?: { [key: string]: string };
   borders?: string[];
   flags: { png: string; svg: string };
   cca3: string;
}

// export interface CountryContextType {
//    countries: CountryDetail[]; // all countries
//    loading: boolean;
//    error?: string | null;
// }

export interface SearchProps {
   value: string;
   onChange: (value: string) => void;
}
