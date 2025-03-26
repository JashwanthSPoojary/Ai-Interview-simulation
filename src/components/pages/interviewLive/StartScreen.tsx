import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export const StartScreen = ({ onStart }: { onStart: () => void }) => (
  <div className="w-full min-h-[calc(100vh-100px)] flex items-center justify-center px-4 py-8">
    <div className="w-full max-w-lg mx-auto flex flex-col items-center justify-center text-center">      
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">Ready to Begin Your Interview?</h2>
      
      <p className="text-gray-600 text-base sm:text-lg max-w-md mx-auto mb-8">
        You'll have limited time for each question. Answer thoughtfully but concisely.
      </p>
      
      <Button 
        onClick={onStart} 
        className="cursor-pointer bg-black hover:bg-gray-800 text-white font-medium rounded-lg py-3 px-8 text-base sm:text-lg transition-all duration-200 hover:transform hover:translate-y-[-2px] hover:shadow-md"
      >
        Start Interview
      </Button>
    </div>
  </div>
);