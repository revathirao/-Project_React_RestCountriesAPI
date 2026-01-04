import "./Spinner.css";

/**
 * Spinner
 * Displays a loading indicator while data is being fetched
 */
export default function Spinner() {
   return (
      <div className="spinner-container">
         <div className="spinner">Loading...</div>
      </div>
   );
}
