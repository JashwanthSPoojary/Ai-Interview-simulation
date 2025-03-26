import NotFoundError from "@/components/basic/NotFoundError";
import Container from "@/components/pages/interviewFeedback/Container";
import Navbar from "@/components/pages/interviewFeedback/Navbar";

const InterviewFeedback = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  if (!/^[a-zA-Z0-9]+$/.test(id)) {
    return <NotFoundError error="Invalid URL" />;
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/checkpoint?feedbackId=${id}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    }
  );
  if (res.status !== 200) {
    const error = await res.json();
    return <NotFoundError error={error.message} />;
  }
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/interview/feedback/${id}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    }
  );
  const feedback = await data.json();
  return (
    <div className="w-full h-full">
      <Navbar/>
      <Container feedback={feedback.data} />
    </div>
  );
};

export default InterviewFeedback;
