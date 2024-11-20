import React, { useState } from 'react'
import "./Circularnav.css"
import Plus from '../../assets/Plus.svg';
import Ellipse from '../../assets/Ellipse.svg';
import Mic from '../../assets/Mic.svg';
import Avatar from '../../assets/Avatar Placeholder.svg';
import Keyboard from '../../assets/Keyboard.svg';
import Semicircle from '../../assets/Semicircle.svg';

export const Circularnav: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const handleToggleExpand = () => {
        setIsExpanded((prevState: any) => !prevState);
      };

  return (
    <div className="expanded-items absolute top-1/4 left-10 w-10 h-10 mt-24 cursor-pointer" onClick={handleToggleExpand}>
    <div className="absolute inset-0 w-full h-full">
      <img src={Ellipse} alt="Ellipse" className="absolute inset-0 w-full h-full" />
    </div>
    <div className={`absolute inset-0 m-auto transition-transform duration-300 ease-in-out ${isExpanded ? 'rotate-45' : ''}`}>
      <img src={Plus} alt="Plus" className="absolute inset-0 m-auto text-sm p-1.5" />
    </div>
    {isExpanded && (
      <div className="expanded-items transition-opacity duration-300 opacity-100 ease-in-out">
        <img src={Semicircle} alt="semicircle" className="semicircle absolute -inset-4 transform scale-100 transition-all duration-500 ease-out opacity-100" />
  
        <div className="icon-container absolute transition-all duration-500 ease-out opacity-100" style={{ transform: 'rotate(-90deg) translate(165px)' }}>
          <div className="icon w-12 h-12 bg-black rounded-full border-2 border-gray-500 flex items-center justify-center rotate-90 hover:scale-110 hover:border-white hover:border-4 hover:bg-[0_0_15px_10px_rgba(255,0,255,0.5),0_0_25px_15px_rgba(0,255,255,0.3)] hover:shadow-[0_0_15px_10px_rgba(255,0,255,0.5),0_0_25px_15px_rgba(0,255,255,0.3)]">
            <img src={Mic} alt="Microphone" className="icon-image w-6 h-6 hover:brightness-150" />
          </div>
        </div>
  
        <div className="icon-container absolute transition-all duration-500 ease-out opacity-100" style={{ transform: 'rotate(0deg) translate(80px)' }}>
          <div className="icon w-12 h-12 bg-black rounded-full border-2 border-gray-500 flex items-center justify-center hover:scale-110 hover:border-white hover:border-4 hover:bg-[0_0_15px_10px_rgba(255,0,255,0.5),0_0_25px_15px_rgba(0,255,255,0.3)] hover:shadow-[0_0_15px_10px_rgba(255,0,255,0.5),0_0_25px_15px_rgba(0,255,255,0.3)]">
            <img src={Keyboard} alt="Keyboard" className="icon-image w-6 h-6 hover:brightness-150" />
          </div>
        </div>
  
        <div className="icon-container absolute transition-all duration-500 ease-out opacity-100" style={{ transform: 'rotate(90deg) translate(165px)' }}>
          <div className="icon w-12 h-12 bg-black rounded-full border-2 border-gray-500 flex items-center justify-center -rotate-90 hover:scale-110 hover:border-white hover:border-4 hover:bg-[0_0_15px_10px_rgba(255,0,255,0.5),0_0_25px_15px_rgba(0,255,255,0.3)] hover:shadow-[0_0_15px_10px_rgba(255,0,255,0.5),0_0_25px_15px_rgba(0,255,255,0.3)]">
            <img src={Avatar} alt="Avatar" className="icon-image w-6 h-6 hover:brightness-150" />
          </div>
        </div>
      </div>
    )}
  </div>
  )
}

Circularnav.displayName = 'Circularnav'