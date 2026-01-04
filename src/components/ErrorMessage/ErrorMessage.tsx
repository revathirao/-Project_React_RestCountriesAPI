/**
 * ErrorMessage
 * Displays a user-friendly error message
 */
export default function ErrorMessage({ message }: { message: string }) {
   return <p className="error">{message}</p>;
}
