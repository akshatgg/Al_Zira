import React, { useRef, useState } from 'react';
import Visualizer from '../../Components/Visualizer/Visualizer';
import { Navbar } from "../Navbar/Navbar.tsx";
import SpeechToText from '../../Components/SpeechToText/SpeechToText.tsx';
import Mic from "../../assets/Mic.svg";
import Keyboard from '../../assets/Keyboard.svg';
import cross from '../../assets/cross.svg';

export const AudioPrompt: React.FC = () => {
  const handleResult = (text: string) => {
    console.log("Recognized Text:", text);
  };

  const [listening, setListening] = useState(false); // To track if it's listening
  const [restartListening, setRestartListening] = useState(false);

  // Create a ref to access SpeechToText methods
  const speechRef = useRef<any>(null);

  // Toggle start/stop listening based on the mic icon click
  const handleToggleListening = () => {
    if (listening) {
      setListening(false); // Stop listening
    } else {
      setListening(true); // Start listening
    }
  };

  // Restart listening using the cross button
  const handleRestart = () => {
    setRestartListening(true);
    setListening(false);
  };

  return (
    <div className="h-screen overflow-hidden relative">
      <Navbar />

      <div className="flex flex-col justify-center items-center xl:gap-y-11 lg:gap-y-11 md:gap-y-7 sm:gap-y-6">
        <div className="text-white font-[Ponnala] text-xl">
          {listening ? "I'm Listening..." : "Click on the Mic to Start"}
        </div>
        <div className="mt-14">
          <Visualizer
            height={100}
            width={400}
            color="#FF5385"
            gap={20}
            numberOfBars={9}
            barWidth={7}
            isListening={listening}
          />
        </div>
        <div>
          <SpeechToText
            ref={speechRef}
            startListening={listening}
            onResult={(text) => handleResult(text)}
          />
        </div>
      </div>

      {/* Bottom buttons container */}
      <div className="absolute bottom-4  left-1/2 transform -translate-x-1/2 flex gap-14 items-center -translate-y-9">
        {/* First icon - smaller */}
        <div   className="icon w-8 h-8 bg-[#1C2E54] rounded-full flex items-center justify-center 
  hover:shadow-[0px_4px_15px_rgba(255,255,255,0.3)] hover:scale-110 transition-all duration-300 ease-in-out" >
          <img src={Keyboard} alt="Keyboard" className="icon-image w-5 h-5 hover:brightness-150" />
        </div>

        {/* Middle icon - Microphone with toggle functionality */}
        <div
  className={`icon w-14 h-14 rounded-full border-2 border-gray-500 flex items-center justify-center 
    hover:scale-110 hover:border-white hover:border-4 
    bg-gradient-to-r from-[#9459B4] to-[#9487D7] 
    ${listening ? 'shadow-[0_0_15px_10px_rgba(255,0,255,0.5),0_0_25px_15px_rgba(0,255,255,0.3)] scale-110 border-white border-4' : ''}
    ${!listening ? 'hover:shadow-[0_0_15px_10px_rgba(255,0,255,0.5),0_0_25px_15px_rgba(0,255,255,0.3)]' : ''}`}
  onClick={handleToggleListening}
>
  <img src={Mic} alt="Microphone" className="icon-image w-6 h-6 hover:brightness-150" />
</div>


        {/* Third icon - smaller (Cross to restart) */}
        <div
  className="icon w-8 h-8 bg-[#1C2E54] rounded-full flex items-center justify-center 
  hover:shadow-[0px_4px_15px_rgba(255,255,255,0.3)] hover:scale-110 transition-all duration-300 ease-in-out" 
  onClick={handleRestart}
>
  <img src={cross} alt="Cross" className="icon-image w-5 h-5 hover:brightness-150" />
</div>

      </div>
    </div>
  );
};

AudioPrompt.displayName = 'AudioPrompt';
