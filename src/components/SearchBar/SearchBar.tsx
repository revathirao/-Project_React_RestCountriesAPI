import type { SearchProps } from "../../types";

// Search component that accepts search 'value' and an 'onChange' handler as props
/**
 * Search Component
 * * Provides a controlled text input for filtering country lists by name.
 * It broadcasts value changes back to the parent component in real-time.
 ** @param {string} value - The current search query string.
 * @param {Function} onChange - Function to execute whenever the input text changes.
 */
const Search = ({ value, onChange }: SearchProps) => {
   return (
      <div className="search-container">
         <input
            type="text"
            placeholder="Search for a country..."
            value={value} // Controlled input: value is driven by parent state
            onChange={(e) => onChange(e.target.value)} //Pass the input value to the parent callback
         />
         <span className="search-icon">🔍</span>
      </div>
   );
};

export default Search;
