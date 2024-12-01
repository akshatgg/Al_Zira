import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";

interface SpeechToTextProps {
  language?: string;
  onResult?: (text: string) => void;
  startListening?: boolean; // Prop to start listening
  stopListening?: boolean; // Prop to stop listening
  restartListening?: boolean; // Prop to restart listening
}

const SpeechToText = forwardRef<any, SpeechToTextProps>(({ 
  language = "en-US", 
  onResult, 
  startListening, 
  stopListening, 
  restartListening 
}, ref) => {
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

    // Cleanup when component unmounts
    return () => {
      recognition.stop();
    };
  }, [recognition, language, onResult]);

  useEffect(() => {
    if (startListening && !isListening) {
      recognition.start();
      setIsListening(true);
    }
  }, [startListening, isListening, recognition]);

  useEffect(() => {
    if (stopListening && isListening) {
      recognition.stop();
      setIsListening(false);
    }
  }, [stopListening, isListening, recognition]);

  useEffect(() => {
    if (restartListening) {
      recognition.stop();
      setTranscript(""); // Clear current transcript
      recognition.start();
      setIsListening(true);
    }
  }, [restartListening, recognition]);

  useImperativeHandle(ref, () => ({
    startRecognition: () => {
      recognition.start();
      setIsListening(true);
    },
    stopRecognition: () => {
      recognition.stop();
      setIsListening(false);
    },
    restartRecognition: () => {
      recognition.stop();
      setTranscript("");
      recognition.start();
      setIsListening(true);
    },
  }));

  return (
    <div>
      
      <div
  className="bg-transparent text-white p-2 font-[Ponnala] text-center"
  style={{
    width: "300px",
    fontSize: "25px",
    overflowY: "auto",
  
  }}
>
  {transcript || "Start speaking to see the text here..."}
</div>
      <div>
        <button
          onClick={() => (isListening ? recognition.stop() : recognition.start())}
        >
          {isListening ? "Stop Listening" : "Start Listening"}
        </button>
      </div>
    </div>
  );
});

export default SpeechToText;
