"use client";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { RiCornerDownRightLine, RiUploadLine } from "react-icons/ri";
import { useRef, useState } from "react";
import axios from "axios";
import { ICVData } from "@/components/cvData";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
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

  const handleNext = async () => {
    // Check if a file is selected
    if (
      !inputFileRef.current?.files ||
      inputFileRef.current.files.length === 0
    ) {
      alert("Please Add Your CV");
      return;
    }

    // Get the selected file
    const file = inputFileRef.current.files[0];

    // Create a FormData object and append the file
    const formData = new FormData();
    formData.append("cv_file", file);

    try {
      // Make a POST request to FastAPI using Axios
      const response = await axios.post<ICVData>(
        "http://192.168.92.179:8000/api/v1/cv/extract",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      // Handle the response data
      const cvData = response.data;
      // Store the data in local storage
      localStorage.setItem("cvData", JSON.stringify(cvData));

      // Navigate to the cv-data page
      router.push("/cv-data");
    } catch (error) {
      console.error("Error uploading CV:", error);

      // Error handling for network or server issues
      if (axios.isAxiosError(error) && error.response) {
        alert(
          `Failed to upload CV: ${error.response.data.detail || error.message}`,
        );
      } else {
        alert("An error occurred while uploading your CV. Please try again.");
      }
    }
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
