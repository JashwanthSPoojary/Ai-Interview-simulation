import NotFoundError from "@/components/basic/NotFoundError";
import Navbar from "@/components/pages/interviewStart/Navbar";
import StartHeader from "@/components/pages/interviewStart/StartHeader";

const InterviewStart = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  if (!/^[a-zA-Z0-9]+$/.test(id)) {
    return <NotFoundError error="Invalid URL" />;
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/checkpoint?developerId=${id}`,
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
  return (
    <div className="min-h-screen flex justify-center items-center ">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-8">
        <Navbar id={id}/>
        <StartHeader />
      </div>
    </div>
  );
};

export default InterviewStart;
