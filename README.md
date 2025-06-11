# AI Interview Simulation

AI Interview Simulation is a web application that lets you upload your resume and experience a simulated interview process powered by AI. After uploading your resume, the AI creates a customized profile where you can review and edit your details. The AI then generates interview questions based on your resume, mimicking a real interview scenario and providing detailed feedback on your performance at the end.

---

## Features

- **Resume Upload**: Upload your PDF resume, which is parsed and analyzed by the application.
- **Custom Profile Generation**: The AI creates a profile from your resume which you can review and edit.
- **AI-Generated Interview**: The AI generates personalized interview questions based on your resume content.
- **Real-Time Mock Interview**: Experience a realistic interview process, with questions asked in real-time.
- **Persistent Interview State**: Your interview session persists even if you refresh the browser.
- **Performance Feedback**: Receive detailed feedback on your interview performance.

---

## Tech Stack

- **Next.js** – React framework for server-side rendering and frontend.
- **pdf-parse** – Library for parsing PDF resumes.
- **Gemini API** – Used for generating AI-powered interview questions and feedback.
- **Framer Motion** – For smooth and engaging UI animations.
- **Prisma + PostgreSQL** – ORM and database for storing user and interview data.

---

## Challenges Faced & Learnings

- **Prompt Engineering for LLM**: 
  - Crafting the right system prompts for the Gemini API was a challenge. After several iterations, I managed to find a prompt that consistently provided responses in a JSON format that could be reliably parsed.
- **Real-Time Persistence**: 
  - Ensuring that the interview process state persisted through page refreshes required using Zustand with its persist middleware, which saves the state to the browser's localStorage.
- **PDF Parsing**: 
  - Learned to effectively extract and process data from PDF documents using the `pdf-parse` library.
- **UI/UX Enhancements**: 
  - Built an efficient and visually appealing profile preview page for users to review and edit their information.

---

## Getting Started

### Project Startup Instructions

1. **Clone the repository**  
   ```bash
   git clone https://github.com/JashwanthSPoojary/Ai-Interview-simulation.git
   cd Ai-Interview-simulation
   ```

2. **Create your environment file**  
   - In the root directory, create a `.env` file.
   - Use `.env.example` as a reference and add your credentials to `.env`.

3. **Setup the database**  
   ```bash
   npx prisma migrate deploy
   npx prisma generate
   ```

4. **Run the development server**  
   ```bash
   npm run dev
   ```

5. **Open the app**  
   - Go to [http://localhost:3000](http://localhost:3000) in your browser.

---

## License

This project is for learning and personal use.

---

> **Note:**  
> The originality and core ideas of this project description have been preserved as per the author's experience and journey.
