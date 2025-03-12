"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileIcon, UploadIcon, CheckCircle, AlertCircle, FileText } from "lucide-react"// import type { PutBlobResult } from "@vercel/blob"
import axios from "axios"
import { useRouter } from "next/navigation"

export function ResumeUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadResult, setUploadResult] = useState<{
    success: boolean
    message: string
  } | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const isPdfFile = (file: File): boolean => {
    const validMimeType = file.type === "application/pdf"
    const validExtension = file.name.toLowerCase().endsWith(".pdf")
    return validMimeType && validExtension
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    setFile(selectedFile)
    setUploadResult(null)

    // Validate file type immediately on selection
    if (selectedFile && !isPdfFile(selectedFile)) {
      setUploadResult({
        success: false,
        message: `Invalid file format: ${selectedFile.name}. Please upload a PDF file.`,
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!file) {
      setUploadResult({
        success: false,
        message: "Please select a PDF file to upload",
      })
      return
    }

    if (!isPdfFile(file)) {
      setUploadResult({
        success: false,
        message: `Invalid file format: ${file.name}. Only PDF files are accepted.`,
      })
      return
    }

    try {
      setUploading(true)
      const formData = new FormData()
      formData.append("resume", file)
      const response = await axios.post("/api/interview/setup",formData)
      if(response.status === 200){
        setUploadResult({
          success: true,
          message: "Resume uploaded successfully!",
        })
        router.push(`/interview/preview/${response.data.fileName}`)
      }
      setFile(null)
      if (inputRef.current) {
        inputRef.current.value = ""
      }
    } catch (error) {
      console.error("Error uploading file:", error)
      setUploadResult({
        success: false,
        message: error instanceof Error ? error.message : "Failed to upload resume. Please try again.",
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <Card className="w-full">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-6 w-6 mr-2 text-primary" />
            Upload Your Resume
          </CardTitle>
          <CardDescription>Please upload your resume in PDF format only</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 py-6">
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg py-6 px-6 text-center hover:border-primary/50 transition-colors">
            <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <Label htmlFor="resume" className="text-sm font-medium block mb-2 cursor-pointer">
              Click to select a PDF file
            </Label>
            <p className="text-xs text-muted-foreground mb-4">Only .PDF files are accepted</p>
            <Input
              ref={inputRef}
              id="resume"
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            <Button type="button" variant="outline" size="sm" onClick={() => inputRef.current?.click()}>
              <FileIcon className="h-4 w-4 mr-2" />
              Browse Files
            </Button>
          </div>

          {file && (
            <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
              <FileText className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium truncate">{file.name}</span>
              <span className="text-xs text-muted-foreground ml-auto">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
            </div>
          )}

          {uploadResult && (
            <div
              className={`flex items-center gap-2 p-3 rounded-md ${
                uploadResult.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
              }`}
            >
              {uploadResult.success ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
              <span className="text-sm">{uploadResult.message}</span>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2">
          <Button type="submit" className="w-full" disabled={!file || uploading || (file && !isPdfFile(file))}>
            {uploading ? (
              <>
                <span className="animate-spin mr-2">
                  <UploadIcon className="h-4 w-4" />
                </span>
                Uploading...
              </>
            ) : (
              <>
                <UploadIcon className="h-4 w-4 mr-2" />
                Upload Resume
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

