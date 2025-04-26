import Navbar from "@/components/pages/interviewSetup/Navbar";
import { ResumeUpload } from "@/components/pages/interviewSetup/ResumeUpload";

export default function InterviewSetup() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[calc(100vh-100px)] flex-col items-center justify-center p-4 md:p-24 relative">
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center mb-6">Resume Upload</h1>
          <p className="text-muted-foreground text-center mb-8">
            Please upload your <span className="font-semibold">resume</span> in <span className="font-semibold">PDF format</span> only. 
            <br />
            <span className="font-medium">
              Note: Only actual resumes are accepted. Uploading other PDF documents may cause rejection or unknown results.
            </span>
          </p>
          <ResumeUpload />
        </div>
      </main>
    </>
  );
}

