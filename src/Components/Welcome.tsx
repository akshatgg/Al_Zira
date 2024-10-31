import React from 'react';
import SendIcon from '../assets/send-icon.svg';
import Media from '../assets/media.svg';
import Add from '../assets/add.svg'

export const Welcome: React.FC = () => {
  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
          <img src={Add} alt="Add" className="absolute left-0 inset-y-40 cursor-pointer" />
      <div className="text-center space-y-4"> {/* Inner container for vertical alignment */}
        <h2 className="text-3xl font-sans bg-gradient-to-r from-blue-400 to-pink-400 inline-block bg-clip-text text-transparent">
          Hello, Mukesh Anand G
        </h2>
        <p className="text-gray-400 text-lg">What Can I Help With?</p>

        {/* Search Bar */}
        <div className="relative w-full max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Ask F.R.I.D.A.Y"
            className="w-full p-3 pr-10 rounded-lg text-white placeholder-slate-800 text-center focus:outline-none bg-transparent border border-gray-800"
          />
          <img src={SendIcon} alt="SendIcon" className="absolute inset-y-2 right-3 p-0 w-8 h-8" />
          <img src={Media} alt="Media" className="absolute inset-y-3 left-3 p-0 w-6 h-6" />
        </div>

        <div className="mt-6 pb-20 space-x-3 flex justify-center">
          <button className="text-white bg-transparent border border-orange-400 py-2 px-4 rounded-lg hover:bg-gray-700 text-sm">Suggest a movie.</button>
          <button className="text-white bg-transparent border border-green-700 py-2 px-4 rounded-lg hover:bg-gray-700 text-sm">What's the weather today?</button>
          <button className="text-white bg-transparent border border-red-600 py-2 px-4 rounded-lg hover:bg-gray-700 text-sm">Play a song.</button>
        </div>
      <p className='text-gray-700 font-mono pt-20'>F.R.I.D.A.Y Can make Mistakes. So Check Important Info</p>
      </div>
    </div>
  );
};

Welcome.displayName = 'Welcome';
export default Welcome;
