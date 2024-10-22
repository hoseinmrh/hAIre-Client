"use client";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { RiAddLine, RiCheckLine, RiUploadLine } from "react-icons/ri";
import { useRef, useState } from "react";
import { CVData, ICVData } from "@/components/cvData";

const test: ICVData = {
  name: "Hosein",
  email: "hoseinmirhoseini64@gmail.com",
  work_experiences: [
    {
      position: "Software Engineer",
      company: "Scalapay",
      from_to: "2021-01-01 to Present",
      description: "Software Engineer at Scalapay",
    },
    {
      position: "Frontend Developer",
      company: "Scalapay",
      from_to: "2020-01-01 to 2021-01-01",
      description: "Frontend Developer at Scalapay",
    },
  ],
  education: [
    {
      degree: "Bachelor of Computer Science",
      institution: "Shiraz University",
      from_to: "2017-01-01 to 2021-09-01",
    },
  ],
};
export default function Home() {
  const handleSubmit = () => {
    // console.log(questions);
  };
  return (
    <main className="bg-black text-orange-500 h-full">
      <div className="container max-w-3xl m-auto">
        <div className="flex flex-col items-center justify-between p-10 mt-20">
          <CVData {...test} />
          <button
            // onClick={handleSubmit}
            className="relative bg-black text-orange-500 py-3 px-10 rounded-3xl
            drop-shadow-[0_2px_5px_rgba(255,165,0,0.8)]
            focus:outline-none hover:drop-shadow-[0_3px_10px_rgba(255,165,0,1)]
             text-4xl mt-24 mb-12"
          >
            <RiCheckLine
              size="48px"
              style={{ display: "inline" }}
              className="ml-2"
            />{" "}
            Submit
          </button>
        </div>
      </div>
      <footer>
        <a href="/" className="flex justify-center mb-12">
          <Image src={"/logo2.png"} alt={"logo"} width={80} height={20} />
        </a>
      </footer>
    </main>
  );
}
