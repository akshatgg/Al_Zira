import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";

interface SpeechToTextProps {
  language?: string;
  onResult?: (text: string) => void;
  startListening?: boolean;
}

const SpeechToText = forwardRef<any, SpeechToTextProps>(
  ({ language = "en-US", onResult, startListening }, ref) => {
    const [transcript, setTranscript] = useState<string>(""); // Complete transcript
    const [interimTranscript, setInterimTranscript] = useState<string>(""); // Interim (live) transcript

    const SpeechRecognition =
      window.SpeechRecognition || (window as any).webkitSpeechRecognition;

    const recognition = SpeechRecognition ? new SpeechRecognition() : null;

    useEffect(() => {
      if (!recognition) {
        console.error("Speech Recognition is not supported in this browser.");
        alert("Speech Recognition is not supported in this browser.");
        return;
      }

      recognition.lang = language;
      recognition.interimResults = true;
      recognition.continuous = true;

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let finalText = "";
        let interimText = "";

        for (let i = 0; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalText += result[0].transcript;
          } else {
            interimText += result[0].transcript;
          }
        }

        setTranscript((prev) => prev + finalText); // Append the final text to the previous transcript
        setInterimTranscript(interimText); // Update interim text for live display

        if (onResult && finalText) {
          onResult(finalText); // Callback with final text
        }
      };

      recognition.onerror = (event) => {
        console.error("Speech Recognition Error:", event.error);
      };

      recognition.onend = () => {
        console.log("Speech recognition stopped.");
        setInterimTranscript(""); // Clear interim transcript on stop
      };

      return () => {
        recognition.stop(); // Cleanup when component unmounts
      };
    }, [recognition, language, onResult]);

    useEffect(() => {
      if (!recognition) return;

      if (startListening) {
        recognition.start();
      } else {
        recognition.stop();
      }
    }, [startListening, recognition]);

    useImperativeHandle(ref, () => ({
      startRecognition: () => {
        if (recognition) {
          recognition.start();
        }
      },
      stopRecognition: () => {
        if (recognition) {
          recognition.stop();
        }
      },
    }));

    return (
      <div>
        <div className="bg-transparent text-white p-2 font-[Ponnala] text-center text-[25px] overflow-y-auto xl:w-[300px] xl:h-[200px] xl:text-[25px] lg:w-[250px] lg:h-[150px] lg:text-xl md:w-[250px] md:h-[150px] md:text-xl sm:w-[250px] sm:h-[160px] sm:text-xl">
          {/* Display interim text (live) followed by the accumulated transcript */}
          {interimTranscript || transcript || "Start speaking to see the text here..."}
        </div>
      </div>
    );
  }
);

SpeechToText.displayName = "SpeechToText";
export default SpeechToText;
