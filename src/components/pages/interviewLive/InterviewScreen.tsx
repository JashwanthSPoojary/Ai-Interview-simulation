import { useInterviewStore } from "@/stores/store";
import axios from "axios";
import { useParams , useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { StartScreen } from "./StartScreen";
import { CompletionScreen } from "./CompletionScreen";
import { QuestionUI } from "./QuestionUI";

interface Question {
  id: string;
  question: string;
}

interface QuestionsProps {
  questions: Question[];
}

const InterviewScreen = ({ questions }: QuestionsProps) => {
  const { id } = useParams();
  const router = useRouter();
  
  // Get state from store
  const { 
    currentIndex, 
    answers, 
    setCurrentIndex, 
    addAnswer, 
    hasStarted, 
    setHasStarted, 
    isInterviewComplete, 
    setIsInterviewComplete, 
    interviewId, 
    setInterviewId 
  } = useInterviewStore();
  
  // Local state
  const [currentAnswer, setCurrentAnswer] = useState<string>("");
  const [timer, setTimer] = useState<number>(30);
  const [loading,setLoading] = useState<boolean>(false);

  // Timer effect
  useEffect(() => {
    if (timer > 0 && hasStarted && !isInterviewComplete) {
      const interval = setInterval(() => {
        setTimer((time) => time - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (hasStarted && timer === 0) {
      handleSubmit();
    }
  }, [timer, hasStarted, isInterviewComplete]);

  // Handle session changes
  useEffect(() => {
    if (interviewId && interviewId !== id) {
      console.log("New session detected. Resetting state...");
      useInterviewStore.setState({
        interviewId: id as string,
        hasStarted: false,
        currentIndex: 0,
        answers: [],
        isInterviewComplete: false,
      });
    } else {
      setInterviewId(id as string);
    }
  }, [id, interviewId, setInterviewId]);

  // Answer submission handler
  const handleSubmit = () => {
    if (!questions[currentIndex]) return;
    
    addAnswer({
      questionId: questions[currentIndex].id,
      answer: currentAnswer,
    });
    
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsInterviewComplete(true);
    }
    
    setCurrentAnswer("");
    setTimer(30);
  };

  // Feedback submission handler
  const handleFeedback = async () => {
    try {
      setLoading(true)
      const res = await axios.post(`/api/interview/live/${id}/complete`, {
        answers,
      });
      const feedbackId = res.data.id;
      router.push(`/interview/feedback/${feedbackId}`);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }finally{
      setLoading(false);
    }
  };

  // Render appropriate screen based on state
  if (!hasStarted) {
    return (
        <StartScreen onStart={() => setHasStarted(true)} />
    )
  }
  
  if (isInterviewComplete) {
    return <CompletionScreen onFeedback={handleFeedback} loading={loading}  />;
  }
  
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-100px)] p-4 bg-gradient-to-b from-white to-gray-50">
      {questions[currentIndex] && (
        <QuestionUI
          question={questions[currentIndex].question}
          currentAnswer={currentAnswer}
          setCurrentAnswer={setCurrentAnswer}
          handleSubmit={handleSubmit}
          currentIndex={currentIndex}
          totalQuestions={questions.length}
          timer={timer}
        />
      )}
    </div>
  );
};

export default InterviewScreen;