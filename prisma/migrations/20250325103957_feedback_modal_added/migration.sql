-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "overallShortFeedback" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeedbackDetail" (
    "id" TEXT NOT NULL,
    "feedbackId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "improvement" TEXT NOT NULL,
    "suggestion" TEXT NOT NULL,

    CONSTRAINT "FeedbackDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FeedbackDetail" ADD CONSTRAINT "FeedbackDetail_feedbackId_fkey" FOREIGN KEY ("feedbackId") REFERENCES "Feedback"("id") ON DELETE CASCADE ON UPDATE CASCADE;
