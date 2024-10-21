"use client";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { RiUploadLine } from "react-icons/ri";

export default function Home() {
  return (
    <main className="bg-black text-orange-500 h-full">
      <div className="container max-w-3xl m-auto">
        <div className="flex flex-col items-center justify-between p-10 mt-20">
          <Image src={"/logo2.png"} alt={"logo"} width="400" height="200" />

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
            className="text-center mt-28 text-5xl"
            cursor={false}
          />

          <button
            className="relative bg-black text-orange-500 py-4 px-10 rounded-3xl
            drop-shadow-[0_2px_5px_rgba(255,165,0,0.8)]
            focus:outline-none hover:drop-shadow-[0_3px_10px_rgba(255,165,0,1)]
             text-4xl mt-28"
          >
            <RiUploadLine style={{ display: "inline" }} className="ml-2" />{" "}
            Upload CV
          </button>
        </div>
      </div>
    </main>
  );
}
