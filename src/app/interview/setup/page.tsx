import { ResumeUpload } from "@/components/features/ResumeUpload"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function InterviewSetup() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 relative">
      <div className="absolute top-4 left-4 md:top-8 md:left-8">
        <Link
          href="/dashboard"
          className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </Link>
      </div>
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Resume Upload</h1>
        <p className="text-muted-foreground text-center mb-8">Upload your resume in PDF format to get started</p>
        <ResumeUpload />
      </div>
    </main>
  )
}

