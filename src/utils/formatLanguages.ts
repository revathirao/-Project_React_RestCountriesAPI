/**
 * Helper function to safely format languages from the API
 ** Converts a language object into a comma-separated string.
 * @param languages - Object with language codes as keys and names as values
 * @returns A formatted string or "N/A" if no languages exist
 */
function formatLanguages(languages?: { [key: string]: string }): string {
   if (!languages) return "N/A";
   return Object.values(languages).join(", ");
}
