AI Interview Simulation project : 
 Upload your resume , ai creates profile for customize profile for you to check out details about your resume where you can edit the existing information . AI generates the questions from your resume . Tries to mock real interview proccess by asking questions . In the end you get a feedback on your performance .
 
 Tech Stack used : 
 Next js 
 pdf parser
 Gemini api
 Framer motion
 Prisma + PostgrsSQL database 

 Challenges i faced and Learnings during building AI Interview project :
-- giving right system prompt to gemini api to get right response from LLM . It was hard part after trying for multiple system prompt changes i was able to get a consistent response from LLM which i can successfully parse into JSON format . 
-- Make it real time by persisting data on refresh while interview process going on was challenging . So i found out a solution by using Zustand persist which stores data in localstorage of browser for data persistence even in browser refresh . 
-- i got to learn how to parse PDF documents through pdf-parser library . 
--  i have built a good looking and efficient profile preview page . 

Project Startup 
create .env file in root of project
take reference of .env.example and add your credentials to your .env file
npx prisma migrate deploy
npx prisma generate 
npm run dev




