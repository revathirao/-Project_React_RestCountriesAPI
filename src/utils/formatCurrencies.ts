/**
 * Helper function to safely format currencies from the API
 * * Formats currency objects into a readable string of names.
 * @example { USD: { name: "Dollar" } } -> "Dollar"
 * @param currencies - an optional object of currency codes mapping to {name, symbol}
 * @returns a string of currency names joined by commas, or "N/A" if none
 */
function formatCurrencies(currencies?: {
   [key: string]: { name: string; symbol: string };
}): string {
   if (!currencies) return "N/A";
   return Object.values(currencies)
      .map((c) => c.name)
      .join(", ");
}
