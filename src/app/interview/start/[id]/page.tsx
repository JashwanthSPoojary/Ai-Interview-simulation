const StartInterview = () => {
  return (
    <div>
      <h2>Start the Interview </h2>
      <div>
        <h4>Select the Interview Duration</h4>
        <select>
          <option value="180">3 min ( 6 questions )</option>
          <option value="180">5 min ( 10 questions )</option>
          <option value="180">7 min ( 14 questions )</option>
        </select>
      </div>
      <div>
        <h4>Instructions for Interview Session</h4>
        <ul>
          <li>Each question has a 30-second time limit</li>
          <li>The answer will be automatically submitted when time expires</li>
          <li>Questions are personalized based on your resume</li>
          <li>You'll receive feedback after completing all questions</li>
        </ul>
      </div>
    </div>
  );
};

export default StartInterview;
