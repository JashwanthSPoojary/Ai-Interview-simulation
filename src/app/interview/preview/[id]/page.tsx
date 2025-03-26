import NotFoundError from '@/components/basic/NotFoundError';
import Navbar from '@/components/pages/interviewFeedback/Navbar';
// import Navbar from '@/components/pages/interviewPreview/Navbar';
import PreviewCards from '@/components/pages/interviewPreview/PreviewCards';
import PreviewHeader from '@/components/pages/interviewPreview/PreviewHeader';


const InterviewPreview = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  if (!/^[a-zA-Z0-9]+$/.test(id)) {
    return <NotFoundError error="Invalid URL" />;
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/interview/preview/${id}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });

  if(res.status !== 200) {
    const error = await res.json();
    return <NotFoundError error={error.message} />;
  }

  const profile = await res.json();
  const profileId = profile.id;

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar/>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-6">
        {/* <Navbar/> */}
        <PreviewHeader interviewId={profileId} />
        <PreviewCards data={profile} />
      </div>
    </div>
  );
};

export default InterviewPreview;
