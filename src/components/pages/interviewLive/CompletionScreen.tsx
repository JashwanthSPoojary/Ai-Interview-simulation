import { Button } from "@/components/ui/button";
import { CheckCircle, Loader } from "lucide-react";

export const CompletionScreen = ({ onFeedback , loading }: { onFeedback: () => void , loading: boolean }) => (
  <div className="w-full min-h-[calc(100vh-100px)] flex items-center justify-center px-4 py-8">
    <div className="w-full max-w-lg mx-auto flex flex-col items-center justify-center text-center">
      <div className="bg-green-100 text-green-600 rounded-full p-3 md:p-4 mb-6 md:mb-8 transform transition-transform hover:scale-105">
        <CheckCircle className="h-8 w-8 md:h-12 md:w-12" />
      </div>
      
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">Interview Completed!</h2>
      
      <p className="text-gray-600 text-base sm:text-lg max-w-md mx-auto mb-8">
        Thank you for completing the interview. You can now view your feedback.
      </p>
      
      <Button 
        onClick={onFeedback} 
        className="bg-black hover:bg-gray-800 text-white font-medium rounded-lg py-3 px-8 text-base sm:text-lg transition-all duration-200 hover:transform hover:translate-y-[-2px] hover:shadow-md"
      >
        {loading?(<><Loader className="animate-spin"/> Please Wait</>):"View Feedback"}
      </Button>
    </div>
  </div>
);