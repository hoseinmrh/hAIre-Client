"use client";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { RiAddLine, RiCheckLine, RiCloseLine } from "react-icons/ri";
import { useRef, useState } from "react";

export default function Home() {
  const questionTextRef = useRef<HTMLTextAreaElement>(null);
  const [questions, setQuestions] = useState<string[]>([]);

  const handleAdd = () => {
    const questionText = questionTextRef.current?.value;
    if (!questionText) {
      alert("Please Enter a Question");
      return;
    }

    // Add the new question to the existing state
    setQuestions((prevQuestions) => [...prevQuestions, questionText]);

    // Clear the textarea after adding the question
    if (questionTextRef.current) {
      questionTextRef.current.value = "";
    }
  };

  const handleDelete = () => {
    setQuestions([]);
  };

  const handleSubmit = () => {
    console.log(questions);
  };
  return (
    <main className="bg-black text-orange-500 h-full">
      <div className="container max-w-3xl m-auto">
        <div className="flex flex-col items-center justify-between p-10 mt-20">
          <TypeAnimation
            sequence={[
              "Dear HR! Add your questions...",
              3000,
              "and make the applicants suffer (:",
              3000,
            ]}
            wrapper="span"
            speed={60}
            style={{ display: "inline-block" }}
            repeat={Infinity}
            className="text-center mt-28 text-4xl"
            cursor={false}
          />
          <textarea
            className="bg-transparent w-full rounded-2xl p-2 placeholder:opacity-50 mt-28 text-xl
            drop-shadow-[0_2px_5px_rgba(255,165,0,0.8)]
                        text-white mb-2"
            placeholder="Question..."
            rows={1}
            ref={questionTextRef}
          />
          <div className="w-full flex justify-end space-x-8">
            <button
              onClick={handleAdd}
              className="bg-black text-orange-500 py-2 w-40 rounded-3xl
            drop-shadow-[0_1px_3px_rgba(255,165,0,0.8)]
            focus:outline-none hover:drop-shadow-[0_2px_5px_rgba(255,165,0,1)]
             text-md mt-10"
            >
              <RiAddLine style={{ display: "inline" }} className="ml-2" /> Add
              Question
            </button>

            <button
              onClick={handleDelete}
              className="bg-red-500 text-white py-2 w-40 rounded-3xl
            drop-shadow-[0_1px_3px_rgba(255,165,0,0.8)]
            focus:outline-none hover:drop-shadow-[0_2px_5px_rgba(255,165,0,1)]
             text-md mt-10"
            >
              <RiCloseLine style={{ display: "inline" }} className="ml-2" />{" "}
              Delete All
            </button>
          </div>
          <div className="w-full flex justify-start">
            <ul className="text-white text-2xl list-disc pl-5">
              {questions.map((question, index) => (
                <li key={index}>{question}</li>
              ))}
            </ul>
          </div>
          <hr />
          <div className="w-full flex flex-col justify-start text-gray-500">
            <div className="text-2xl font-bold mb-4 mt-8">
              Some recommended questions:
            </div>
            <ul className="text-xl list-disc pl-5">
              <li key={0}>Where do you see yourself in the next 5 years?</li>
              <li key={0}>What is your biggest achievement?</li>
              <li key={0}>Who are your role models?</li>
            </ul>
          </div>

          <button
            onClick={handleSubmit}
            className="relative bg-orange-500 text-black py-2 w-48 rounded-3xl
            drop-shadow-[0_2px_5px_rgba(255,165,0,0.8)]
            focus:outline-none hover:drop-shadow-[0_3px_10px_rgba(255,165,0,1)]
             text-xl mt-24 mb-12"
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
