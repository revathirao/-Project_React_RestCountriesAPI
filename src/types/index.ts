export type Theme = "light" | "dark";

export interface ThemeContextType {
   theme: Theme;
   toggleTheme: () => void;
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
}

export interface CountryListProps {
   countries: Country[];
   loading: boolean;
   error?: string | null;
}

export interface CountryCardProps {
   country: Country;
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

export interface SearchProps {
   value: string;
   onChange: (value: string) => void;
}

export interface FilterDropdownProps {
   value: string; // current selected region
   onChange: (value: string) => void; // callback when user selects a new region
}

export interface BorderCountriesProps {
   borderCodes?: string[]; // e.g., ["FRA", "DEU", "BEL"]
}
