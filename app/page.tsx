"use client";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { RiCornerDownRightLine, RiUploadLine } from "react-icons/ri";
import { useRef, useState } from "react";

export default function Home() {
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [filename, setFilename] = useState<string>("");

  const handleClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click(); // Ensure the ref is not null
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setFilename(file.name);
      // Handle the uploaded file here (e.g., upload it to the server or process it)
    }
  };

  const handleNext = () => {
    if (!filename) {
      alert("Please Add Your CV");
      return;
    }
    console.log("meow");
  };
  return (
    <main className="bg-black text-orange-500 h-full">
      <div className="container max-w-3xl m-auto">
        <div className="flex flex-col items-center justify-between p-10 mt-20">
          <Image src={"/logo2.png"} alt={"logo"} width="300" height="200" />

          <TypeAnimation
            sequence={[
              "Welcome to the hAIre!",
              5000,
              "Upload your CV and let the magic happen!",
              5000,
            ]}
            wrapper="span"
            speed={60}
            style={{ display: "inline-block" }}
            repeat={1}
            className="text-center mt-28 text-4xl"
            cursor={false}
          />
          <div className="flex flex-row space-x-20">
            <div>
              <button
                onClick={handleClick}
                className="relative bg-black text-orange-500 py-2 w-48 rounded-3xl
            drop-shadow-[0_2px_5px_rgba(255,165,0,0.8)]
            focus:outline-none hover:drop-shadow-[0_3px_10px_rgba(255,165,0,1)]
             text-xl mt-28"
              >
                <RiUploadLine size="48px" style={{ display: "inline" }} />{" "}
                Upload CV
              </button>
              <input
                ref={inputFileRef}
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={handleFileChange}
              />
              <div className="mt-2">{filename}</div>
            </div>

            <div>
              <button
                onClick={handleNext}
                className="relative bg-orange-500 text-black py-2 w-48 rounded-3xl
            drop-shadow-[0_2px_5px_rgba(255,165,0,0.8)]
            focus:outline-none hover:drop-shadow-[0_3px_10px_rgba(255,165,0,1)]
             text-xl mt-28"
              >
                <RiCornerDownRightLine
                  size="48px"
                  style={{ display: "inline" }}
                />{" "}
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
