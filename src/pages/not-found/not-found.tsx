import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4 text-center">
      <h1 className="mb-4 text-6xl font-bold text-red-600">404</h1>
      <p className="mb-6 text-xl font-semibold">Page Not Found</p>
      <p className="mb-4">The page you are looking for does not exist or the URL is incorrect.</p>
      <Link to="/home" className="text-blue-600 underline hover:text-blue-800">
        Go back to Home
      </Link>
    </div>
  );
}
