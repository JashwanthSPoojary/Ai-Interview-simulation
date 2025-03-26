import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { QuestionTimer } from "./QuestionTimer";
import { Award, CheckCircle, Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const QuestionUI = ({ 
    question, 
    currentAnswer, 
    setCurrentAnswer, 
    handleSubmit, 
    currentIndex, 
    totalQuestions, 
    timer 
  }: { 
    question: string, 
    currentAnswer: string, 
    setCurrentAnswer: (value: string) => void, 
    handleSubmit: () => void, 
    currentIndex: number, 
    totalQuestions: number, 
    timer: number 
  }) => {
    const progress = ((currentIndex + 1) / totalQuestions) * 100;
    
    return (
      <Card className="w-full max-w-2xl mx-auto shadow-lg border border-gray-200 overflow-hidden">
        {/* Top progress bar */}
        <div className="h-1.5 bg-gray-100 w-full">
          <div 
            className="h-full bg-black transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <CardHeader className="space-y-3 pb-4 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center bg-black text-white rounded-full h-8 w-8 text-sm font-bold">
                {currentIndex + 1}
              </div>
              <CardTitle className="text-lg sm:text-xl font-bold">
                Question {currentIndex + 1} of {totalQuestions}
              </CardTitle>
            </div>
            
            <QuestionTimer seconds={timer} />
          </div>
          
          <div className="flex gap-2 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <CheckCircle className="h-3.5 w-3.5" />
              <span>Questions: {totalQuestions}</span>
            </div>
            <div className="flex items-center gap-1">
              <Award className="h-3.5 w-3.5" />
              <span>Progress: {Math.round(progress)}%</span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6 pt-6">
          <div className="relative">
            <div className="absolute left-0 top-0 h-full w-2 bg-black rounded-full" />
            <div className="text-lg font-medium p-3 pl-5 bg-gray-50 rounded-lg">
              {question}
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="answer" className="text-sm font-medium text-gray-700">
                Your Answer
              </label>
              <div className="text-xs text-gray-500">
                <span>Required</span>
              </div>
            </div>
            <Textarea 
              id="answer"
              value={currentAnswer} 
              onChange={(e) => setCurrentAnswer(e.target.value)} 
              placeholder="Type your answer here..."
              className="min-h-36 border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-all rounded-lg resize-none"
            />
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between sm:justify-end pt-2 pb-6 px-6 border-t border-gray-100 mt-4">
          <Button 
            onClick={handleSubmit} 
            className="w-full sm:w-auto bg-black hover:bg-gray-800 text-white py-2 px-5 rounded-lg shadow-sm transition-all hover:shadow-md flex items-center justify-center gap-2"
            disabled={currentAnswer.trim() === ""}
          >
            <span>Submit Answer</span>
            <Send className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    );
  };