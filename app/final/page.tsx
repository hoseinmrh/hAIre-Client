"use client";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { RiCornerDownRightLine, RiMicLine } from "react-icons/ri";
import { useRef, useState } from "react";

export default function Home() {
  return (
    <main className="bg-black text-orange-500 h-full">
      <div className="container max-w-3xl m-auto">
        <div className="flex flex-col items-center justify-between p-10 mt-20">
          <TypeAnimation
            sequence={[
              "TADAAA! Your interview is over!",
              3000,
              "We will contact you ASAP!",
              3000,
            ]}
            wrapper="span"
            speed={60}
            style={{ display: "inline-block" }}
            repeat={Infinity}
            className="text-center mt-12 text-4xl"
            cursor={false}
          />

          <Image
            src={"/tada.png"}
            alt={"tada"}
            width={300}
            height={100}
            className="mt-12 mb-24"
          />
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
