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
