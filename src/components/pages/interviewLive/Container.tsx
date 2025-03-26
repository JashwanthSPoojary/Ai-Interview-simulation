"use client"
import { useState } from "react"
import Navbar from "./Navbar";
import QuitModal from "./QuitModal";
import InterviewScreen from "./InterviewScreen";

const Container = ({data}:{data:any}) => {
    const [quitToggle,setQuitToggle] = useState<boolean>(false);
  return (
    <>
    <QuitModal toggle={quitToggle} setToggle={setQuitToggle} />
    <Navbar setToggle={setQuitToggle}/>
    <InterviewScreen questions={data}/>
    </>
  )
}

export default Container