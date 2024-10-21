"use client";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { RiUploadLine } from "react-icons/ri";
import { useRef } from "react";

export default function Home() {
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click(); // Ensure the ref is not null
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      console.log("Selected file:", file);
      // Handle the uploaded file here (e.g., upload it to the server or process it)
    }
  };
  return (
    <main className="bg-black text-orange-500 h-full">
      <div className="container max-w-3xl m-auto">
        <div className="flex flex-col items-center justify-between p-10 mt-20">
          <TypeAnimation
            sequence={[
              "Dear HR! Add your questions...",
              5000,
              "and make the applicants suffer (:",
              5000,
            ]}
            wrapper="span"
            speed={60}
            style={{ display: "inline-block" }}
            repeat={1}
            className="text-center mt-28 text-5xl"
            cursor={false}
          />
          <textarea
            className="bg-transparent w-full rounded-2xl p-2 placeholder:opacity-50 mt-28 text-xl
            drop-shadow-[0_2px_5px_rgba(255,165,0,0.8)]
                        text-white mb-2"
            placeholder="Question..."
            rows={1}
            // ref={full_name_ref}
          />
        </div>
      </div>
    </main>
  );
}
