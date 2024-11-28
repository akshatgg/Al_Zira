import React, { useState, useEffect, useRef } from 'react';
import SendIcon from '../../assets/send-icon.svg';
import Media from '../../assets/media.svg';
import "./Prompt.css";
import AnswerIcon from '../../assets/AnswerIcon.svg';
import { useSelector } from 'react-redux';
import { RootState } from '@reduxjs/toolkit/query';
import { Circularnav } from '../../Components/Circularnav/Circularnav';
import Copy from '../../assets/Copy.svg';
import Like from '../../assets/Like.svg';
import DisLike from '../../assets/DisLike.svg';
import Liked from '../../assets/Liked.svg';
import DisLiked from '../../assets/DisLiked.svg';
import Volume from '../../assets/Volume.svg';
import VolumeUp from '../../assets/VolumeUp.svg';

// Dummy JSON data
const dummyData = [
  { question: "What's the Tesla share price today?", answer: "Tesla's share price is $169.84, down by -8.05 (4.53%)" },
  { question: "What's the weather today?", answer: "The weather today is sunny with a high of 75°F." },
  { question: "Suggest a movie.", answer: "I suggest watching 'Inception'." },
  { question: "Play a song.", answer: "Playing 'Shape of You' by Ed Sheeran." },
];

export const Prompt: React.FC = () => {

  const [input, setInput] = useState('');
  const [chat, setChat] = useState<{ question: string; answer: string }[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const { user, loading, error, rememberMe } = useSelector((state: RootState) => state.auth);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [likeStates, setLikeStates] = useState<Record<number, boolean>>({});
  const [dislikeStates, setDislikeStates] = useState<Record<number, boolean>>({});
  const [volumeStates, setVolumeStates] = useState<Record<number, boolean>>({});

  const { uid: userId, name: userName, email: userEmail } = JSON.parse(localStorage.getItem("data") || "{}");

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

  const handleRequest = () => {
    if (input.trim() === '') return;

    if (!hasSearched) {
      setHasSearched(true);
      setChat([{ question: "", answer: "Hi! How can I help you today?" }]);
    }

    const response = dummyData.find(
      (item) => item.question.toLowerCase() === input.toLowerCase()
    );

    const newChat = response
      ? { question: input, answer: response.answer }
      : { question: input, answer: "I'm not sure about thata sffffffff eeeee wwwwwwww ssssssssss" };

    setChat((prevChat) => [...prevChat, newChat]);
    setInput('');
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000); // Reset after 2 seconds
  };

  const handleLike = (index: number) => {
    setLikeStates((prev) => ({ ...prev, [index]: !prev[index] }));
    setDislikeStates((prev) => ({ ...prev, [index]: false })); // Ensure Dislike is reset
  };

  const handleDislike = (index: number) => {
    setDislikeStates((prev) => ({ ...prev, [index]: !prev[index] }));
    setLikeStates((prev) => ({ ...prev, [index]: false })); // Ensure Like is reset
  };

  const toggleVolume = (index: number) => {
    setVolumeStates((prev) => ({ ...prev, [index]: !prev[index] }));
  };



  return (
    <div className="bg-black text-center relative text-white overflow-hidden">
      {/* Plus icon with expanded menu */}
      <div className="absolute top-4 left-4 z-50">
        <Circularnav />
      </div>

      <div className="flex flex-col h-screen justify-center items-center pb-10">
        {!hasSearched ? (
          <>
            <h2 className="lg:text-4xl md:text-3xl text-2xl font-sans bg-gradient-to-r from-blue-400 to-pink-400 inline-block bg-clip-text text-transparent">
              Hello, {user?.name || userName}
            </h2>
            <p className="text-gray-400 lg:text-xl md:text-lg text-sm">What Can I Help With?</p>

            <div className="relative w-full lg:max-w-2xl md:max-w-md sm:max-w-sm max-w-xs mx-auto px-4 mt-4">
              {/* Input field */}
              <input
                type="text"
                placeholder="Ask F.R.I.D.A.Y"
                className="w-full p-2 pr-12 pl-10 rounded-lg text-white placeholder-slate-800 text-center focus:outline-none bg-transparent border border-gray-800 lg:text-lg md:text-base text-sm"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleRequest();
                  }
                }}
              />
              {/* Send Icon */}
              <img
                src={SendIcon}
                alt="SendIcon"
                className="absolute inset-y-1 right-5 p-0 w-8 h-8 cursor-pointer"
                onClick={handleRequest}
              />
              {/* Media Icon */}
              <label htmlFor="file-upload" className="absolute inset-y-3 left-5 p-0 w-4 h-5 cursor-pointer">
                <img
                  src={Media}
                  alt="Media"
                  className="absolute inset-y-0 left-2 p-0 w-4 h-5 cursor-pointer"
                />
              </label>
              <input
                id="file-upload"
                type="file"
                onChange={handleFileChange}
                className="hidden"
              />
              {/* Upload Progress */}
              {uploading && (
                <div className="absolute inset-x-0 top-12 w-full bg-gray-700 rounded-lg overflow-hidden">
                  <div
                    style={{ width: `${uploadProgress}%` }}
                    className="bg-blue-500 h-1 transition-all duration-200"
                  ></div>
                </div>
              )}
            </div>

            {/* Suggestion Buttons */}
            <div className="mt-5 pb-20 space-x-3 flex flex-wrap justify-center">
              <button
                className="text-white bg-transparent border border-orange-400 py-1 px-2 rounded-lg hover:bg-gray-700 text-sm"
                onClick={() => setInput("Suggest a movie.")}
              >
                Suggest a movie.
              </button>
              <button
                className="text-white bg-transparent border border-green-700 py-1 px-2 rounded-lg hover:bg-gray-700 text-sm"
                onClick={() => setInput("What's the weather today?")}
              >
                What's the weather today?
              </button>
              <button
                className="text-white bg-transparent border border-red-600 py-1 px-2 rounded-lg hover:bg-gray-700 text-sm"
                onClick={() => setInput("Play a song.")}
              >
                Play a song.
              </button>
            </div>
          </>
        ) : (
          <div
            className="flex-1 overflow-y-auto max-h-[calc(90vh-100px)] translate-y-[-50px] flex-col w-full max-w-3xl mx-auto mt-0 p-0 space-y-3 bg-black "
            ref={chatContainerRef}
          >
            {chat.map((msg, index) => (
              <div key={index} className="flex flex-col ">
                <div className="text-white font-mono font-normal p-3 bg-gray-900 rounded-3xl max-w-xs self-end ml-0 mr-0 ">
                  <p>{msg.question}</p>
                </div>
                {msg.answer && (
                  <div className="text-white font-mono font-normal  max-w-xs self-start mt-0 ">
                    <div className="flex">
                      <img src={AnswerIcon} alt="AnswerIcon" className="w-5 h-5 mr-4" />
                    <div className=" bg-gray-900 p-3 rounded-3xl max-w-xl">
                      <p className='text-md'>{msg.answer}</p>
                    </div>
                    </div>
                    <div className='flex mt-1 '>
                      <button onClick={() => toggleVolume(index)} className=" mt-1.5 ml-10 cursor-pointer hover:bg-gray-600 transition-colors duration-200 rounded-sm">
                        <img
                          src={volumeStates[index] ? VolumeUp : Volume}
                          alt="Volume"
                          className="w-4 h-4 "
                          style={{ filter: "invert(1)" }}
                        />
                      </button>
                      <button
                        className="mt-1.5 ml-2 flex items-center justify-center text-gray-300 hover:text-white text-sm hover:bg-gray-600 transition-colors duration-200 rounded-sm"
                        onClick={() => handleCopy(msg.answer, index)}
                        title="Copy to clipboard"
                      >
                        <img src={Copy} alt="Copy Answer" className='w-4 h-4' style={{ filter: "invert(1)" }} />
                        {copiedIndex === index && <span className="ml-1 text-sm">Copied!</span>}
                      </button>
                      <button onClick={() => handleLike(index)} className="mt-1.5 ml-2 cursor-pointer hover:bg-gray-600 transition-colors duration-200 rounded-sm">
                        <img
                          src={likeStates[index] ? Liked : Like}
                          alt="Like"
                          className="w-4 h-4"
                          style={{ filter: "invert(1)" }}
                        />
                      </button>
                      <button onClick={() => handleDislike(index)} className="mt-1.5 ml-2 cursor-pointer hover:bg-gray-600 transition-colors duration-200 rounded-sm">
                        <img
                          src={dislikeStates[index] ? DisLiked : DisLike}
                          alt="Dislike"
                          className="w-4 h-4"
                          style={{ filter: "invert(1)" }}
                        />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Sticky Input for Chat */}
        {hasSearched && (
          <div className="fixed bottom-4 left-0 right-0 mx-auto w-full lg:max-w-3xl md:max-w-xl max-w-lg px-4">
            <div className="relative w-full lg:max-w-3xl md:max-w-xl max-w-lg mx-auto px-4 mt-4">
              <input
                type="text"
                placeholder="Ask F.R.I.D.A.Y"
                className="w-full p-2 pr-12 pl-10 rounded-lg text-white placeholder-slate-800 text-center focus:outline-none bg-black border border-gray-800"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleRequest();
                  }
                }}
              />
              <img
                src={SendIcon}
                alt="SendIcon"
                className="absolute inset-y-1 right-5 p-0 w-8 h-8 cursor-pointer"
                onClick={handleRequest}
              />
              <label htmlFor="file-upload" className="absolute inset-y-3 left-5 p-0 w-4 h-5 cursor-pointer">
                <img
                  src={Media}
                  alt="Media"
                  className="absolute inset-y-0 left-2 p-0 w-4 h-5 cursor-pointer"
                />
              </label>
              <input id="file-upload" type="file" onChange={handleFileChange} className="hidden" />
              {uploading && (
                <div className="absolute inset-x-0 top-12 w-full bg-gray-700 rounded-lg overflow-hidden">
                  <div
                    style={{ width: `${uploadProgress}%` }}
                    className="bg-blue-500 h-1 transition-all duration-200"
                  ></div>
                </div>
              )}
            </div>
            <p className='text-center text-slate-700 font-medium p-1'>F.R.I.D.A.Y. can make mistakes. Check important info.</p>
          </div>
        )}
      </div>
    </div>

  );
};