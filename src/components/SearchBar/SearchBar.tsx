import type { SearchProps } from "../../types";

const Search = ({ value, onChange }: SearchProps) => {
   return (
      <div className="search-container">
         <input
            type="text"
            placeholder="Search for a country..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
         />
         <span className="search-icon">🔍</span>
      </div>
   );
};

export default Search;
