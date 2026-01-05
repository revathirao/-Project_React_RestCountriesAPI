import type { SearchProps } from "../../types";

const Search = ({ value, onChange }: SearchProps) => {
   return (
      <input
         type="text"
         placeholder="Search for a country..."
         value={value}
         onChange={(e) => onChange(e.target.value)}
      />
   );
};

export default Search;
