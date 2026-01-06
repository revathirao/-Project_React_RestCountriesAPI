import { useState, useEffect } from "react";

/**
 * A custom hook that manages data fetching, loading states, and error handling.
 ** @template T - The expected type of the data returned by the API.
 * @param {string} url - The endpoint URL to fetch data from.
 * @returns {object} An object containing the fetched `data`, `loading` status, and any `error` message.
 */
export default function useFetch<T>(url: string) {
   // State to store the data returned from the API
   const [data, setData] = useState<T | null>(null);

   // State to track the loading status of the request
   const [loading, setLoading] = useState<boolean>(true);

   // State to store any error messages encountered
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      if (!url) return; // Don't fetch if URL is empty
      // Initialize AbortController to allow canceling the fetch request
      const controller = new AbortController();

      // Extract the signal to pass it to the fetch options
      const signal = controller.signal;

      // Internal async function to handle the fetch logic
      const fetchData = async () => {
         // Start loading and clear previous errors
         setLoading(true);
         setError(null); // Reset error state on new requests

         try {
            // Execute the fetch request with the abort signal
            const response = await fetch(url, { signal });

            // Check if the HTTP status code is in the 200-299 range
            // If the response status is not 2xx, throw an error
            if (!response.ok) throw new Error("Network response was not ok");

            // Parse the response body as JSON
            const jsonResponse = await response.json();

            // Update the data state with the successful response
            setData(jsonResponse);
         } catch (error: any) {
            // Only update error state if the fetch wasn't aborted manually
            if (error.name !== "AbortError") {
               setError(error.message);
            }
         } finally {
            // Always set loading to false once the request finishes (success or fail)
            setLoading(false);
         }
      };

      // Trigger the fetch operation
      fetchData();

      // Cleanup: Cancel the request if the component unmounts or the URL changes
      return () => controller.abort();
   }, [url]); // Re-run the effect whenever the URL changes

   // Return the current state of the fetch operation
   return { data, loading, error } as const;
}
