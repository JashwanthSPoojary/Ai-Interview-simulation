import PreviewCards from '@/components/pages/interviewPreview/PreviewCards';
import PreviewHeader from '@/components/pages/interviewPreview/PreviewHeader';
import axios from 'axios';

const InterviewPreview = async ({params}:{params:Promise<{id:string}>}) => {
    const { id } = await params;
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/interview/preview/${id}`);
    const profile = res.data;
    const profileId = String(profile.id);
    console.log(profileId);
    
  return (

    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-8">
        <PreviewHeader interviewId={profileId}/>
        <PreviewCards data={profile} />
      </div>
    </div>
  )
}

export default InterviewPreview;