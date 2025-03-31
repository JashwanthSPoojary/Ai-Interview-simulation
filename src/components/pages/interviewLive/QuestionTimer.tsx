import { Clock } from "lucide-react";

export const QuestionTimer = ({ seconds, totalSeconds = 60 }: { seconds: number, totalSeconds?: number }) => {
    const percentage = (seconds / totalSeconds) * 100;
    
    return (
      <div className="flex items-center gap-2 text-gray-700">
        <div className="relative h-8 w-8 rounded-full flex items-center justify-center bg-gray-100">
          <Clock className="h-4 w-4 text-black" />
          <svg className="absolute top-0 left-0 h-8 w-8" viewBox="0 0 36 36">
            <circle 
              cx="18" cy="18" r="16" fill="none" 
              className="stroke-current text-gray-200" 
              strokeWidth="2" 
            />
            <circle 
              cx="18" cy="18" r="16" fill="none" 
              className="stroke-current text-black" 
              strokeWidth="2" 
              strokeDasharray="100" 
              strokeDashoffset={100 - percentage}
              transform="rotate(-90 18 18)" 
            />
          </svg>
        </div>
        <span className="font-mono font-medium">{seconds}s</span>
      </div>
    );
  };