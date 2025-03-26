export function formatQuestionWithAnswers(questionWithAnswer: {
  questions: {
    answers: { answer: string }[];
    question: string;
  }[];
}): string {
  return questionWithAnswer.questions
    .map(
      (data, index) =>
        `Q${index + 1}: ${data.question}\nA${index + 1}: ${data.answers[0]?.answer || "No answer provided"}`
    )
    .join("\n\n");
}
