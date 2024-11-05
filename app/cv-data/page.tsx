"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { CVData, ICVData } from "@/components/cvData";
import { RiCornerDownRightLine } from "react-icons/ri";
import axios from "axios";
import { useRouter } from "next/navigation";

export interface IEvaluateFit {
  result: boolean;
  score: number;
}

export default function Home() {
  const router = useRouter();
  const [cvData, setCvData] = useState<ICVData | null>(null);

  // Retrieve data from local storage when the component mounts
  useEffect(() => {
    const storedData = localStorage.getItem("cvData");
    if (storedData) {
      setCvData(JSON.parse(storedData) as ICVData);
    }
  }, []);

  const onNext = async () => {
    const api_route = `${process.env.NEXT_PUBLIC__API_URL}/hr-panel/evaluate-fit`;
    const response = await axios.get<IEvaluateFit>(api_route);

    if (response.data.result) {
      router.push("/interview");
    } else {
      router.push("/sorry");
    }
  };

  return (
    <main className="bg-black text-orange-500 h-full">
      <div className="container max-w-3xl m-auto">
        <div className="flex flex-col items-center justify-between p-10 mt-20">
          {cvData ? (
            <CVData {...cvData} />
          ) : (
            <p className="mb-20 text-3xl">No CV data found</p>
          )}
          <div>
            <a
              onClick={onNext}
              className="relative bg-orange-500 text-black py-4 px-8 rounded-3xl
            drop-shadow-[0_2px_5px_rgba(255,165,0,0.8)]
            focus:outline-none hover:drop-shadow-[0_3px_10px_rgba(255,165,0,1)]
             text-xl mt-28"
            >
              <RiCornerDownRightLine
                size="48px"
                style={{ display: "inline" }}
              />{" "}
              Next
            </a>
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
