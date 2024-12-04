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
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState<string>("");

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
        const results = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("");
        setTranscript(results);

        if (onResult) {
          onResult(results);
        }
      };

      recognition.onerror = (event) => {
        console.error("Speech Recognition Error:", event.error);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      return () => {
        recognition.stop();
      };
    }, [recognition, language, onResult]);

    useEffect(() => {
      if (!recognition) return;

      if (startListening && !isListening) {
        recognition.start();
        setIsListening(true);
      } else if (!startListening && isListening) {
        recognition.stop();
      }
    }, [startListening, recognition, isListening]);

    useImperativeHandle(ref, () => ({
      startRecognition: () => {
        if (recognition && !isListening) {
          recognition.start();
          setIsListening(true);
        }
      },
      stopRecognition: () => {
        if (recognition && isListening) {
          recognition.stop();
          setIsListening(false);
        }
      },
    }));

    return (
      <div>
        <div className="bg-transparent text-white p-2 font-[Ponnala] text-center text-[25px] overflow-y-auto xl:w-[300px] xl:h-[200px] xl:text-[25px] lg:w-[250px] lg:h-[150px] lg:text-xl md:w-[250px] md:h-[150px] md:text-xl sm:w-[250px] sm:h-[160px] sm:text-xl">
          {transcript || "Start speaking to see the text here..."}
        </div>
      </div>
    );
  }
);

SpeechToText.displayName = "SpeechToText";
export default SpeechToText;
