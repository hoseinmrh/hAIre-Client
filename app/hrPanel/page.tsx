"use client";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import axios from "axios";
export default function Home() {
  const downloadReport = async () => {
    try {
      const apiRoute = `${process.env.NEXT_PUBLIC__API_URL}/hr-panel/download-report`;

      // Send a GET request to the API
      const response = await axios.get(apiRoute, {
        responseType: "blob", // Required to handle the file download as binary data
      });

      // Create a URL for the blob and trigger the download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "hr_report.pdf"); // The file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Clean up after download
    } catch (error) {
      if (error instanceof Error) {
        alert(
          "Report might not be available right now. PLease try again later",
        );
      } else {
        console.error("An unknown error occurred.");
      }
    }
  };

  const downloadShortReport = async () => {
    try {
      const apiRoute = `${process.env.NEXT_PUBLIC__API_URL}/hr-panel/download-report-short`;

      // Send a GET request to the API
      const response = await axios.get(apiRoute, {
        responseType: "blob", // Required to handle the file download as binary data
      });

      // Create a URL for the blob and trigger the download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "hr_report_short.pdf"); // The file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Clean up after download
    } catch (error) {
      if (error instanceof Error) {
        alert(
          "Report might not be available right now. PLease try again later",
        );
      } else {
        console.error("An unknown error occurred.");
      }
    }
  };
  return (
    <main className="bg-black text-orange-500 h-full">
      <div className="container max-w-3xl m-auto">
        <div className="flex flex-col items-center justify-between p-10 mt-20">
          <TypeAnimation
            sequence={["Hi, Dear HR!", 3000, "Choose your option", 3000]}
            wrapper="span"
            speed={60}
            style={{ display: "inline-block" }}
            repeat={Infinity}
            className="text-center text-4xl"
            cursor={false}
          />

          <a
            href="/hrDashboard"
            className="text-white text-2xl mt-28 mb-4 hover:text-gray-200 underline"
          >
            Fill out the form
          </a>

          <a
            onClick={downloadReport}
            className="text-white text-2xl mt-4 mb-4 hover:text-gray-200 underline"
          >
            Download the report
          </a>

          <a
            onClick={downloadShortReport}
            className="text-white text-2xl mt-4 mb-28 hover:text-gray-200 underline"
          >
            Download the short report
          </a>
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
