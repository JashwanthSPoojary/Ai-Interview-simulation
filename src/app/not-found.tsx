import { AlertTriangle } from "lucide-react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-black p-6">
      <AlertTriangle className="w-12 h-12" />
      <h4 className="text-xl font-semibold mt-4">Page Not Found</h4>
      <p className="text-sm text-gray-600 mt-2">
        The page you are looking for does not exist.
      </p>
      <Link href="/" className="mt-4 px-4 py-2 bg-black text-white rounded-md">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
