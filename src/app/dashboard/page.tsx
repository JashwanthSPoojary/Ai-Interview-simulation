"use client";
import {  useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
export default function Dashboard() {
  const router = useRouter();
  const handleSubmit = () => {
    router.push('/interview/setup');
  };
  return (
    <div>
      <button onClick={handleSubmit}>Start the Interview</button>
    </div>
  );

}