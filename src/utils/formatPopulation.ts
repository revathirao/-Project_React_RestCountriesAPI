/**
 * Format large numbers with commas
 * Example: 12345678 → "12,345,678"
 * @param value - The numeric value to be formatted.
 * @returns A string representation of the number formatted for the "en-US" locale.
 */
export function formatNumber(value: number): string {
   return new Intl.NumberFormat("en-US").format(value);
}
