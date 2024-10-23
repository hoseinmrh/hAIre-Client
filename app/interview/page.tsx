"use client";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { RiCornerDownRightLine, RiMicLine } from "react-icons/ri";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

const questions = [
  "meow meow meow",
  "weqweqwe",
  "wewdsadadwad",
  "csacddwdw",
  "21312edsad134edwawdqwdwd",
];
export default function Home() {
  const router = useRouter();
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(0);
  const [hasFinished, setHasFinished] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>("");

  const handleButton = () => {
    setQuestion(questions[counter]);
    setCounter(counter + 1);

    if (!hasStarted) {
      setHasStarted(true);
      return;
    }
    if (counter == 5) {
      setHasFinished(true);
      return;
    }
    if (hasFinished) {
      router.push("/final");
    }
  };
  return (
    <main className="bg-black text-orange-500 h-full">
      <div className="container max-w-3xl m-auto">
        <div className="flex flex-col items-center justify-between p-10 mt-20">
          <TypeAnimation
            sequence={["Please answer the following questions"]}
            wrapper="span"
            speed={60}
            style={{ display: "inline-block" }}
            repeat={1}
            className="text-center mt-12 text-4xl"
            cursor={false}
          />

          <Image
            src={"/hr.png"}
            alt={"hr"}
            width={300}
            height={100}
            className="mt-12"
          />

          <button
            onClick={handleButton}
            className={`relative ${hasFinished ? "bg-red-500 text-white" : "bg-orange-500 text-black"} py-2 w-48 rounded-3xl
              drop-shadow-[0_2px_5px_rgba(255,165,0,0.8)]
              focus:outline-none hover:drop-shadow-[0_3px_10px_rgba(255,165,0,1)]
              text-xl -mt-12`}
          >
            <RiCornerDownRightLine size="48px" style={{ display: "inline" }} />{" "}
            {hasFinished ? "Finish" : !hasStarted ? "Let's Start" : "Next"}
          </button>

          <div className="text-white text-2xl mt-8">
            {!question ? "" : `Question ${counter}: ${question}`}
          </div>

          <div className="flex w-full justify-end">
            <button
              // onClick={handleMic}
              className="relative bg-black text-orange-500 py-2 px-2 rounded-full
            drop-shadow-[0_2px_5px_rgba(255,165,0,0.8)]
            focus:outline-none hover:drop-shadow-[0_3px_10px_rgba(255,165,0,1)]
             text-xl"
            >
              <RiMicLine size="48px" style={{ display: "inline" }} />
            </button>
          </div>
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
