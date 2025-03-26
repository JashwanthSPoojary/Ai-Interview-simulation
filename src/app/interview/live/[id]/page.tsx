import NotFoundError from "@/components/basic/NotFoundError";
import Container from "@/components/pages/interviewLive/Container";
import Navbar from "@/components/pages/interviewLive/Navbar";

const InterviewLive = async ({params}:{params:Promise<{id:string}>}) => {
  const { id } = await params;
  if (!/^[a-zA-Z0-9]+$/.test(id)) {
    return <NotFoundError error="Invalid URL" />;
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/interview/live/${id}/question`,{
    method:"GET",
    headers:{
      "Content-type":"application-json"
    }
  });
  if(res.status!==200){
    const error = await res.json();
    return <NotFoundError error={error.message}/>
  };
  const data = await res.json();
  const questions = data.question;
  return (
    <div className="min-h-screen">
      <Container data={questions}/>
    </div>
  )
}

export default InterviewLive;