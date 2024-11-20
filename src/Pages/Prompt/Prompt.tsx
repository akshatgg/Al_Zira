import React, { useState } from 'react';
import SendIcon from '../../assets/send-icon.svg';
import Media from '../../assets/media.svg';
import Plus from '../../assets/Plus.svg';
import Ellipse from '../../assets/Ellipse.svg';
import Mic from '../../assets/Mic.svg';
import Avatar from '../../assets/Avatar Placeholder.svg';
import Keyboard from '../../assets/Keyboard.svg';
import Semicircle from '../../assets/Semicircle.svg';
import { useSelector } from 'react-redux';
import { RootState } from '@reduxjs/toolkit/query';

export const Prompt: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const { user, loading, error, rememberMe } = useSelector((state: RootState) => state.auth);
  
  const handleToggleExpand = () => {
    setIsExpanded(prevState => !prevState);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploading(true);
      setUploadProgress(0);

      // Simulate upload progress
      const uploadInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(uploadInterval);
            setUploading(false);
            return 100;
          }
          return prev + 10;
        });
      }, 300); // Adjust interval duration for upload speed simulation
    }
  };

  return (
    <div className="bg-black lg:h-screen xl:h-[calc(100vh-9vh)] md:h-screen h-screen text-center relative">
      
      <div className="expanded-items absolute top-1/4 left-10 w-10 h-10 mt-24 cursor-pointer" onClick={handleToggleExpand}>
        <div className="absolute inset-0 w-full h-full">
          <img src={Ellipse} alt="Ellipse" className="absolute inset-0 w-full h-full" />
        </div>
        <div className={`absolute inset-0 m-auto transition-transform duration-300 ${isExpanded ? 'rotate-45' : ''}`}>
          <img src={Plus} alt="Plus" className="absolute inset-0 m-auto text-sm p-1.5" />
        </div>
        {isExpanded && (
          <div className="expanded-items">
            <img src={Semicircle} alt="semicircle" className="semicircle absolute -inset-4 transform scale-500" />

            <div className="icon-container absolute" style={{ transform: 'rotate(-90deg) translate(165px)' }}>
              <div className="icon w-12 h-12 bg-black rounded-full border-2 border-gray-500 flex items-center justify-center rotate-90 hover:scale-110 hover:border-white hover:border-4 hover:bg-[0_0_15px_10px_rgba(255,0,255,0.5),0_0_25px_15px_rgba(0,255,255,0.3)] hover:shadow-[0_0_15px_10px_rgba(255,0,255,0.5),0_0_25px_15px_rgba(0,255,255,0.3)]">
                <img src={Mic} alt="Microphone" className="icon-image w-6 h-6 hover:brightness-150" />
              </div>
            </div>

            <div className="icon-container absolute" style={{ transform: 'rotate(0deg) translate(80px)' }}>
              <div className="icon w-12 h-12 bg-black rounded-full border-2 border-gray-500 flex items-center justify-center hover:scale-110 hover:border-white hover:border-4 hover:bg-[0_0_15px_10px_rgba(255,0,255,0.5),0_0_25px_15px_rgba(0,255,255,0.3)] hover:shadow-[0_0_15px_10px_rgba(255,0,255,0.5),0_0_25px_15px_rgba(0,255,255,0.3)]">
                <img src={Keyboard} alt="Keyboard" className="icon-image w-6 h-6 hover:brightness-150" />
              </div>
            </div>

            <div className="icon-container absolute" style={{ transform: 'rotate(90deg) translate(165px)' }}>
              <div className="icon w-12 h-12 bg-black rounded-full border-2 border-gray-500 flex items-center justify-center -rotate-90 hover:scale-110 hover:border-white hover:border-4 hover:bg-[0_0_15px_10px_rgba(255,0,255,0.5),0_0_25px_15px_rgba(0,255,255,0.3)] hover:shadow-[0_0_15px_10px_rgba(255,0,255,0.5),0_0_25px_15px_rgba(0,255,255,0.3)]">
                <img src={Avatar} alt="Avatar" className="icon-image w-6 h-6 hover:brightness-150" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="lg:space-y-4 md:space-y-3 space-y-2 xl:pt-[10%] lg:pt-[15%] md:pt-[20%] pt-[19%]">
        <h2 className="lg:text-4xl md:text-3xl text-2xl font-sans bg-gradient-to-r from-blue-400 to-pink-400 inline-block bg-clip-text text-transparent">
        Hello, {user?.name || "Guest"}
        </h2>
        <p className="text-gray-400 lg:text-xl md:text-lg text-sm">What Can I Help With?</p>

        <div className="relative w-full lg:max-w-3xl md:max-w-xl max-w-lg mx-auto px-4">
          <input
            type="text"
            placeholder="Ask F.R.I.D.A.Y"
            className="w-full p-2 pr-12 pl-10 rounded-lg text-white placeholder-slate-800 text-center focus:outline-none bg-transparent border border-gray-800"
          />
          <img src={SendIcon} alt="SendIcon" className="absolute inset-y-1 right-5 p-0 w-8 h-8" />
          <label htmlFor="file-upload" className="absolute inset-y-3 left-5 p-0 w-4 h-4 cursor-pointer">
            <img src={Media} alt="Media" />
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            className="hidden"
          />

          {uploading && (
            <div className="absolute inset-x-0 top-12 w-full bg-gray-700 rounded-lg overflow-hidden">
              <div
                style={{ width: `${uploadProgress}%` }}
                className="bg-blue-500 h-1 transition-all duration-200"
              ></div>
            </div>
          )}
        </div>

        <div className="lg:mt-6 md:mt-6 mt-5 pb-20 space-x-3 flex justify-center">
          <button className="text-white bg-transparent border border-orange-400 lg:py-2 lg:px-4 md:py-1 md:px-2 py-1 px-2 rounded-lg hover:bg-gray-700 text-sm">Suggest a movie.</button>
          <button className="text-white bg-transparent border border-green-700 lg:py-2 lg:px-4 md:py-1 md:px-2 py-1 px-2 rounded-lg hover:bg-gray-700 text-sm">What's the weather today?</button>
          <button className="text-white bg-transparent border border-red-600 lg:py-2 lg:px-4 md:py-1 md:px-2 py-1 px-2 rounded-lg hover:bg-gray-700 text-sm">Play a song.</button>
        </div>
      </div>

      <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-700 font-mono text-sm">
        F.R.I.D.A.Y Can make Mistakes. So Check Important Info
      </p>
    </div>
  );
};

Prompt.displayName = 'Prompt';
export default Prompt;
