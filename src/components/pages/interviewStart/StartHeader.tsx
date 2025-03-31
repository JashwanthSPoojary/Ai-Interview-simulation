"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

const durationToQuestions = {
  "6": 6,
  "10": 10,
  "14": 14,
};

const StartHeader = () => {
  const { id } = useParams();
  const router = useRouter();
  const [duration, setDuration] = useState<number>();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleStartInterview = async () => {
    if (!duration) {
      setError("Please select the duration");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`/api/interview`, {
        duration,
        id,
      });
      const sessionId = res.data.session;
      router.push(`/interview/live/${sessionId}`);
    } catch (error) {
      console.log(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setError("");
    }
  };

  return (
    <div className="w-full p-6 rounded-lg shadow-sm">
      <div className="mb-8">
        <h4 className="text-xl font-semibold mb-4 text-black">
          Instructions for Interview Session
        </h4>
        <ul className="space-y-2 list-disc pl-5 text-gray-800">
          <li>Each question has a 60-second time limit</li>
          <li>The answer will be automatically submitted when time expires</li>
          <li>Questions are personalized based on your resume</li>
          <li>You'll receive feedback after completing all questions</li>
        </ul>
      </div>

      <div className="mb-8">
        <h4 className="text-xl font-semibold mb-4 text-black">
          Select the Interview Duration
        </h4>
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <div className="flex flex-wrap gap-3 mb-6">
          {Object.entries(durationToQuestions).map(([time, questions], id) => (
            <Button
              variant="outline"
              key={id}
              className={`px-4 py-2 border border-gray-300 rounded-md ${
                questions === duration
                  ? "bg-black text-white border-black"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
              onClick={() => setDuration(questions)}
            >
              {time} min ({questions} questions)
            </Button>
          ))}
        </div>
      </div>

      <Button
        onClick={handleStartInterview}
        disabled={loading || !duration}
        className="w-full sm:w-auto bg-black text-white hover:bg-gray-800 px-6 py-2 rounded-md font-medium transition-colors"
      >
        {loading ? (
          <>
            <Loader className="animate-spin" /> Starting...
          </>
        ) : (
          "Start the Interview"
        )}
      </Button>
    </div>
  );
};

export default StartHeader;
