"use client";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { RiCornerDownRightLine, RiMicLine } from "react-icons/ri";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export interface IResponse {
  status: string;
  question_text: string;
  question_audio: string;
}
export default function Home() {
  const router = useRouter();
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(0);
  const [hasFinished, setHasFinished] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null,
  );
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleMic = async () => {
    if (!isRecording) {
      try {
        // Request microphone access
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: { sampleRate: 16000 }, // Specify the sample rate here
        });

        // Create MediaRecorder instance
        const recorder = new MediaRecorder(stream);
        let audioChunks: BlobPart[] = [];

        // Collect chunks of audio data
        recorder.ondataavailable = (event) => {
          if (event.data && event.data.size > 0) {
            audioChunks.push(event.data);
          }
        };

        // Define the onstop event before starting the recorder
        recorder.onstop = async () => {
          // Create the audio blob from chunks
          const blob = new Blob(audioChunks, { type: "audio/wav" });
          console.log("Audio blob created:", blob);

          if (blob.size > 0) {
            const formData = new FormData();
            formData.append("audio_file", blob, "recording.wav");

            try {
              const api_route = `${process.env.NEXT_PUBLIC__API_URL}/flow/next_step`;
              const response = await axios.post<IResponse>(
                api_route,
                formData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                  },
                },
              );
              if (response.data.status == "completed") {
                setHasFinished(true);
                return;
              }
              setCounter(counter + 1);
              setQuestion(response.data.question_text);

              const base64Audio = response.data.question_audio;
              const audioBlob = base64ToBlob(base64Audio, "audio/wav");

              // Create an audio object and play the audio
              const audioUrl = URL.createObjectURL(audioBlob);
              const audio = new Audio(audioUrl);
              audio.play();

              console.log("Audio uploaded successfully:", response.data);
            } catch (err) {
              console.error("Error uploading audio:", err);
            }
          } else {
            console.error("Recorded audio file is empty!");
          }

          // Reset recording state
          setAudioChunks([]);
          setMediaRecorder(null);
          setIsRecording(false);
        };

        // Start recording
        recorder.start();
        console.log("Recording started...");

        // Update the media recorder and recording state
        setMediaRecorder(recorder);
        setIsRecording(true);
      } catch (err) {
        console.error("Error accessing microphone:", err);
      }
    } else {
      // Stop the recording
      if (mediaRecorder) {
        mediaRecorder.stop();
        console.log("Recording stopped...");
      }
    }
  };

  const base64ToBlob = (base64: string, mimeType: string): Blob => {
    const byteCharacters = atob(base64); // Decode base64 string
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  };

  const handleButton = async () => {
    if (!hasStarted) {
      setCounter(counter + 1);

      const api_route = `${process.env.NEXT_PUBLIC__API_URL}/flow/start`;

      try {
        // Execute the API call
        const response = await axios.post<IResponse>(api_route);

        // Set the question text
        setQuestion(response.data.question_text);

        // Convert the base64 audio string to a Blob
        const base64Audio = response.data.question_audio;
        const audioBlob = base64ToBlob(base64Audio, "audio/wav");

        // Create an audio object and play the audio
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();

        // Update the state
        setHasStarted(true);
      } catch (error) {
        console.error("Error fetching data or playing audio:", error);
      }
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
            className={`relative py-2 w-48 rounded-3xl
            ${hasStarted && !hasFinished ? "bg-gray-600 text-black cursor-not-allowed" : ""}
            ${hasFinished ? "bg-red-500 text-white" : "bg-orange-500 text-black"}
              drop-shadow-[0_2px_5px_rgba(255,165,0,0.8)] bg-orange-500 text-black
              focus:outline-none hover:drop-shadow-[0_3px_10px_rgba(255,165,0,1)]
              text-xl -mt-12`}
          >
            <RiCornerDownRightLine size="48px" style={{ display: "inline" }} />{" "}
            {hasFinished
              ? "Finish"
              : !hasStarted
                ? "Let's Start"
                : "Use the mic!"}
          </button>

          <div className="text-white text-2xl mt-8">
            {!question || hasFinished ? "" : `Question ${counter}: ${question}`}
          </div>

          <div className="flex w-full justify-end">
            <button
              onClick={handleMic}
              disabled={!hasStarted} // Disable the button if hasStarted is false
              className={`relative bg-black text-orange-500 py-2 px-2 rounded-full
    drop-shadow-[0_2px_5px_rgba(255,165,0,0.8)]
    focus:outline-none hover:drop-shadow-[0_3px_10px_rgba(255,165,0,1)]
    text-xl ${!hasStarted ? "opacity-50 cursor-not-allowed" : ""}`} // Add visual feedback when disabled
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
