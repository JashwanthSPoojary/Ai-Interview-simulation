import { AlertTriangle } from "lucide-react";

const NotFoundError = ({ error }: { error: string }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-black p-6">
      <AlertTriangle className="w-12 h-12 text-red-500" />
      <h4 className="text-xl font-semibold mt-4">Page Not Found</h4>
      <h6 className="text-sm text-gray-600 mt-2">{error}</h6>
    </div>
  );
};

export default NotFoundError;
