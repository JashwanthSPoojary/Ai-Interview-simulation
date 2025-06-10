import BackgroundLogo from "@/components/pages/LandingPage/BackgroundLogo";
import Features from "@/components/pages/LandingPage/Features";
import Footer from "@/components/pages/LandingPage/Footer";
import Header from "@/components/pages/LandingPage/Header";
import Navbar from "@/components/pages/LandingPage/Navbar";

export default function LandingPage() {
  console.log("hey the key :");
  console.log(process.env.GEMINI_API);
  return (
    <div className="w-full h-full">
      <Navbar/>
      <Header/>
      <Features/>
      <BackgroundLogo text="InterviewAI" className="h-96"/>
      <Footer/>
    </div>
  );
}
