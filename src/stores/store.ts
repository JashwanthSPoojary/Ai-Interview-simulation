import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Answer {
  questionId: string;
  answer: string;
}

interface InterviewState {
  interviewId: string;
  hasStarted: boolean;
  currentIndex: number;
  answers: Answer[];
  isInterviewComplete: boolean;
  setInterviewId: (value: string) => void;
  setHasStarted: (value: boolean) => void;
  setCurrentIndex: (index: number) => void;
  setIsInterviewComplete: (value: boolean) => void;
  addAnswer: (answer: Answer) => void;
}

export const useInterviewStore = create(
  persist<InterviewState>(
    (set) => ({
      interviewId: "",
      hasStarted: false,
      currentIndex: 0,
      answers: [],
      isInterviewComplete: false,
      setInterviewId: (value) => set({ interviewId: value }),
      setHasStarted: (value) => set({ hasStarted: value }),
      setCurrentIndex: (index) => set({ currentIndex: index }),
      setIsInterviewComplete: (value) =>
        set({
          isInterviewComplete: value,
        }),
      addAnswer: (answer) =>
        set((state) => ({ answers: [...state.answers, answer] })),
    }),
    { name: "interview-storage" }
  )
);
