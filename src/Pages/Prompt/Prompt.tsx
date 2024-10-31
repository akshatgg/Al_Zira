import React from 'react';
import SendIcon from '../../assets/send-icon.svg';
import Media from '../../assets/media.svg';
import Add from '../../assets/add.svg';

export const Prompt: React.FC = () => {
  return (
    <div className="bg-black min-h-screen text-center ">
      <div className="lg:space-y-4 md:space-y-3 space-y-2 xl:pt-[10%] lg:pt-[15%] md:pt-[20%] pt-[19%]"> {/* Inner container for vertical alignment */}
        
        <h2 className="lg:text-4xl md:text-3xl text-2xl font-sans bg-gradient-to-r from-blue-400 to-pink-400 inline-block bg-clip-text text-transparent">
          Hello, Mukesh Anand G
        </h2>
        <p className="text-gray-400 lg:text-xl md:text-lg text-sm">What Can I Help With?</p>

        {/* Increased the width of the input container */}

        <div className="relative w-full lg:max-w-3xl md:max-w-xl max-w-lg mx-auto px-4">
          <input
            type="text"
            placeholder="Ask F.R.I.D.A.Y"
            className="w-full p-2 pr-12 pl-10 rounded-lg text-white placeholder-slate-800 text-center focus:outline-none bg-transparent border border-gray-800"
          />
          <img src={SendIcon} alt="SendIcon" className="absolute inset-y-1 right-5 p-0 w-8 h-8" />
          <img src={Media} alt="Media" className="absolute inset-y-3 left-5 p-0 w-4 h-4" />
        </div>

        <div className=" lg:mt-6 md:mt-6 mt-5pb-20 space-x-3 flex justify-center">
          <button className="text-white bg-transparent border border-orange-400 lg:py-2 lg:px-4 md:py-1 md:px-2 py-1 px-2 rounded-lg hover:bg-gray-700 text-sm">Suggest a movie.</button>
          <button className="text-white bg-transparent border border-green-700 lg:py-2 lg:px-4 md:py-1 md:px-2 py-1 px-2 rounded-lg hover:bg-gray-700 text-sm">What's the weather today?</button>
          <button className="text-white bg-transparent border border-red-600 lg:py-2 lg:px-4 md:py-1 md:px-2 py-1 px-2 rounded-lg hover:bg-gray-700 text-sm">Play a song.</button>
        </div>
        <p className='text-gray-700 font-mono xl:pt-36 lg:pt-24 md:text-sm md:pt-16'>F.R.I.D.A.Y Can make Mistakes. So Check Important Info</p>
      </div>
    </div>
  );
};

Prompt.displayName = 'Prompt';
export default Prompt;
