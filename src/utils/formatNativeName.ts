import type { CountryDetail } from "../types";

export default function formatNativeName(country: CountryDetail): string {
   //nativeName is an object with dynamic language keys: { "fra": { "common": "France" } }
   const nativeNameObj = country.name.nativeName;

   //If the country do not have native name then use common name
   if (!nativeNameObj) return country.name.common;

   const nativeNamesArray =
      /*1. (Object.values(nativeNameObj) as { common: string }[]) -Tells TypeScript:this array contains objects with a common property.”
       *Without this, TypeScript assumes unknown[] → cannot read .common
       * 2.[0]?.common-Safely gets the first object’s .common name
       * 3.?. prevents crashes if the array is empty
       * 4.?? country.name.common -Fallback to the normal country name if no native name exists*/
      Object.values(nativeNameObj) as { common: string }[];
   return nativeNamesArray[0]?.common ?? country.name.common;
}
