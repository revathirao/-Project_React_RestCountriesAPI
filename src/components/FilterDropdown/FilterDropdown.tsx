import type { ChangeEvent } from "react";
import type { FilterDropdownProps } from "../../types";

/**
 * FilterDropdown Component
 ** A reusable dropdown menu used to filter a list of countries by geographic region.
 * It uses a controlled <select> element to update the parent component's state.
 * * @param {string} value - The current active filter value.
 * @param {Function} onChange - Callback function to update the filter state in the parent.
 */
export default function FilterDropdown({
   value,
   onChange,
}: FilterDropdownProps) {
   // Handle selection changes and pass the new value to the parent callback
   function handleChange(e: ChangeEvent<HTMLSelectElement>) {
      onChange(e.target.value);
   }

   return (
      <div className="filter-container">
         <select
            value={value} //  Control the select element with the current state value
            onChange={handleChange} // Trigger handleChange when a user selects a new option
            className="filter-dropdown">
            <option value="">Filter by Region</option>
            {/* List of geographic regions for filtering */}
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
         </select>
      </div>
   );
}
