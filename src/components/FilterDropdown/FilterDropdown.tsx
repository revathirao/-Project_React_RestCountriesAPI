import type { ChangeEvent } from "react";
import type { FilterDropdownProps } from "../../types";

// List of regions (you can add/remove as needed)
const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

export default function FilterDropdown({
   value,
   onChange,
}: FilterDropdownProps) {
    
   function handleChange(e: ChangeEvent<HTMLSelectElement>) {
      onChange(e.target.value);
   }

   return (
      <select value={value} onChange={handleChange} className="filter-dropdown">
         <option value="">Filter by Region</option>
         {regions.map((region) => (
            <option key={region} value={region}>
               {region}
            </option>
         ))}
      </select>
   );
}
