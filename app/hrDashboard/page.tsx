"use client";
import { useRef, useState } from "react";
import axios from "axios";
import { RiAddLine, RiCheckLine, RiCloseLine } from "react-icons/ri";
import { TypeAnimation } from "react-type-animation";
import Image from "next/image";

export default function Home() {
  const questionTextRef = useRef<HTMLTextAreaElement>(null);
  const metricTextRef = useRef<HTMLTextAreaElement>(null);
  const emailAddressRef = useRef<HTMLTextAreaElement>(null);
  const jobInfoRef = useRef<HTMLTextAreaElement>(null);

  const [questions, setQuestions] = useState<string[]>([]);
  const [metrics, setMetrics] = useState<string[]>([]);
  const [askFromCV, setAskFromCV] = useState(false); // New state for the checkbox
  const [askTechnical, setAskTechnical] = useState(false); // New state for the checkbox

  const handleAddQ = () => {
    const questionText = questionTextRef.current?.value;
    if (!questionText) {
      alert("Please Enter a Question");
      return;
    }
    setQuestions((prevQuestions) => [...prevQuestions, questionText]);
    if (questionTextRef.current) questionTextRef.current.value = "";
  };

  const handleDeleteQ = () => setQuestions([]);

  const handleAddM = () => {
    const metricText = metricTextRef.current?.value;
    if (!metricText) {
      alert("Please Enter a Metric");
      return;
    }
    setMetrics((prevMetrics) => [...prevMetrics, metricText]);
    if (metricTextRef.current) metricTextRef.current.value = "";
  };

  const handleDeleteM = () => setMetrics([]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAskFromCV(e.target.checked); // Update the checkbox state
  };

  const handleCheckboxChangeTechnical = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAskTechnical(e.target.checked); // Update the checkbox state
  };

  const handleSubmit = async () => {
    try {
      const emailAddress = emailAddressRef.current?.value;
      if (!emailAddress) {
        alert("Please Enter your email address");
        return;
      }

      const jobInfo = jobInfoRef.current?.value;
      if (!jobInfo) {
        alert("Please Enter Job Information");
        return;
      }

      const data = {
        job_info: jobInfo,
        questions: questions,
        metrics: metrics,
        email_address: emailAddress,
        ask_from_cv: askFromCV,
        ask_technical: askTechnical,
      };

      console.log("data", data);

      const api_route = `${process.env.NEXT_PUBLIC__API_URL}/hr-panel/config`;
      await axios.post(api_route, data);
      alert("Questions added successfully!");
    } catch (error) {
      console.error("Error Adding Questions:", error);
      if (axios.isAxiosError(error) && error.response) {
        alert(
          `Failed to add questions: ${error.response.data.detail || error.message}`,
        );
      } else {
        alert("An error occurred while adding questions. Please try again.");
      }
    }
  };

  return (
    <main className="bg-black text-orange-500 h-full">
      <div className="container max-w-3xl m-auto">
        <div className="flex flex-col items-center justify-between p-10 mt-20">
          <TypeAnimation
            sequence={[
              "Dear HR! Fill out the form...",
              3000,
              "and make the applicants suffer (:",
              3000,
            ]}
            wrapper="span"
            speed={60}
            style={{ display: "inline-block" }}
            repeat={Infinity}
            className="text-center text-4xl"
            cursor={false}
          />

          {/*job info*/}
          <div className="w-full">
            <div className="text-white text-2xl mt-20 text-center">
              Position Information:
            </div>
            <textarea
              className="bg-transparent w-full rounded-2xl p-2 placeholder:opacity-50 mt-4 text-xl drop-shadow-[0_2px_5px_rgba(255,165,0,0.8)] text-white mb-2"
              placeholder="Position Title and Description..."
              rows={4}
              ref={jobInfoRef}
            />
          </div>

          <div className="h-1 w-full bg-gray-50 opacity-25 rounded-xl mt-6 mb-6"></div>

          {/*Email*/}
          <div className="w-full">
            <div className="text-white text-2xl text-center">
              Your email address:
            </div>
            <textarea
              className="bg-transparent w-full rounded-2xl p-2 placeholder:opacity-50 mt-4 text-xl drop-shadow-[0_2px_5px_rgba(255,165,0,0.8)] text-white mb-2"
              placeholder="Email..."
              rows={1}
              ref={emailAddressRef}
            />
          </div>

          <div className="h-1 w-full bg-gray-50 opacity-25 rounded-xl mt-6 mb-6"></div>

          {/*Question*/}
          <div className="w-full">
            <div className="text-white text-2xl text-center">
              Interview questions:
            </div>
            <textarea
              className="bg-transparent w-full rounded-2xl p-2 placeholder:opacity-50 mt-4 text-xl drop-shadow-[0_2px_5px_rgba(255,165,0,0.8)] text-white mb-2"
              placeholder="Question..."
              rows={1}
              ref={questionTextRef}
            />
            <div className="w-full flex justify-end space-x-8">
              <button
                onClick={handleAddQ}
                className="bg-black text-orange-500 py-2 w-40 rounded-3xl drop-shadow-[0_1px_3px_rgba(255,165,0,0.8)] focus:outline-none hover:drop-shadow-[0_2px_5px_rgba(255,165,0,1)] text-md mt-2"
              >
                <RiAddLine style={{ display: "inline" }} /> Add Question
              </button>
              <button
                onClick={handleDeleteQ}
                className="bg-red-500 text-white py-2 w-40 rounded-3xl drop-shadow-[0_1px_3px_rgba(255,165,0,0.8)] focus:outline-none hover:drop-shadow-[0_2px_5px_rgba(255,165,0,1)] text-md mt-2"
              >
                <RiCloseLine style={{ display: "inline" }} className="ml-2" />{" "}
                Delete All
              </button>
            </div>
            <div className="w-full flex justify-start">
              <ul className="text-white text-xl list-disc pl-5">
                {questions.map((question, index) => (
                  <li key={index}>{question}</li>
                ))}
              </ul>
            </div>

            <div className="w-full flex flex-col justify-start text-gray-500">
              <div className="text-2xl font-bold mb-4 mt-8">
                Some recommended questions:
              </div>
              <ul className="text-xl list-disc pl-5">
                <li key={0}>Where do you see yourself in the next 5 years?</li>
                <li key={1}>What is your biggest achievement?</li>
                <li key={2}>Who are your role models?</li>
              </ul>
            </div>
          </div>

          <div className="h-1 w-full bg-gray-50 opacity-25 rounded-xl mt-6 mb-6"></div>

          {/*Metric*/}
          <div className="w-full">
            <div className="text-white text-2xl text-center">
              Evaluation Metrics:
            </div>
            <textarea
              className="bg-transparent w-full rounded-2xl p-2 placeholder:opacity-50 mt-4 text-xl drop-shadow-[0_2px_5px_rgba(255,165,0,0.8)] text-white mb-2"
              placeholder="Metric..."
              rows={1}
              ref={metricTextRef}
            />
            <div className="w-full flex justify-end space-x-8">
              <button
                onClick={handleAddM}
                className="bg-black text-orange-500 py-2 w-40 rounded-3xl drop-shadow-[0_1px_3px_rgba(255,165,0,0.8)] focus:outline-none hover:drop-shadow-[0_2px_5px_rgba(255,165,0,1)] text-md mt-2"
              >
                <RiAddLine style={{ display: "inline" }} /> Add Metric
              </button>
              <button
                onClick={handleDeleteM}
                className="bg-red-500 text-white py-2 w-40 rounded-3xl drop-shadow-[0_1px_3px_rgba(255,165,0,0.8)] focus:outline-none hover:drop-shadow-[0_2px_5px_rgba(255,165,0,1)] text-md mt-2"
              >
                <RiCloseLine style={{ display: "inline" }} className="ml-2" />{" "}
                Delete All
              </button>
            </div>
            <div className="w-full flex justify-start">
              <ul className="text-white text-xl list-disc pl-5">
                {metrics.map((metric, index) => (
                  <li key={index}>{metric}</li>
                ))}
              </ul>
            </div>

            <div className="w-full flex flex-col justify-start text-gray-500">
              <div className="text-2xl font-bold mb-4 mt-8">
                Some recommended metrics:
              </div>
              <ul className="text-xl list-disc pl-5">
                <li key={0}>Confidence</li>
                <li key={1}>Clarity</li>
                <li key={2}>Engagement</li>
              </ul>
            </div>
          </div>

          <div className="h-1 w-full bg-gray-50 opacity-25 rounded-xl mt-6 mb-6"></div>

          {/*ask from cv*/}
          <div className="w-full flex flex-row space-x-4 justify-center">
            <div className="text-white text-2xl text-center">
              Do you want us to ask questions from applicants&#39; CV:
            </div>
            <div className="flex justify-center">
              {/* Single checkbox */}
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="askFromCV"
                  className="hidden peer"
                  checked={askFromCV}
                  onChange={handleCheckboxChange} // Handle checkbox change
                />
                <span
                  className={`relative ${askFromCV ? "bg-orange-500" : "bg-gray-50"} py-4 px-4 rounded-xl
                drop-shadow-[0_2px_5px_rgba(255,165,0,0.8)]
                hover:drop-shadow-[0_3px_10px_rgba(255,165,0,1)] text-xl`}
                ></span>
              </label>
            </div>
          </div>

          <div className="h-1 w-full bg-gray-50 opacity-25 rounded-xl mt-6 mb-6"></div>

          {/*ask technical*/}
          <div className="w-full flex flex-row space-x-4 justify-center">
            <div className="text-white text-2xl text-center">
              Do you want us to ask technical questions:
            </div>
            <div className="flex justify-center">
              {/* Single checkbox */}
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="askFromCV"
                  className="hidden peer"
                  checked={askTechnical}
                  onChange={handleCheckboxChangeTechnical} // Handle checkbox change
                />
                <span
                  className={`relative ${askTechnical ? "bg-orange-500" : "bg-gray-50"} py-4 px-4 rounded-xl
                drop-shadow-[0_2px_5px_rgba(255,165,0,0.8)]
                hover:drop-shadow-[0_3px_10px_rgba(255,165,0,1)] text-xl`}
                ></span>
              </label>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="relative bg-orange-500 text-black py-2 w-48 rounded-3xl
            drop-shadow-[0_2px_5px_rgba(255,165,0,0.8)] focus:outline-none hover:drop-shadow-[0_3px_10px_rgba(255,165,0,1)]
            text-xl mt-24 mb-12"
          >
            <RiCheckLine size="48px" style={{ display: "inline" }} /> Submit
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
