import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "./Circularnav.css";
import Plus from "../../assets/Plus.svg";
import Ellipse from "../../assets/Ellipse.svg";
import Mic from "../../assets/Mic.svg";
import Avatar from "../../assets/Avatar Placeholder.svg";
import Keyboard from "../../assets/Keyboard.svg";
import Semicircle from "../../assets/Semicircle.svg";
import { ClassNames } from "@emotion/react";

type ButtonData = {
  id: string;
  path: string;
  icon: string;
  rotation: number;
  translate: number;
};

const buttonsData: ButtonData[] = [
  {
    id: "avatar",
    path: "/avatar",
    icon: Avatar,
    rotation: -25,
    translate: 90,
  },
  {
    id: "prompt",
    path: "/home",
    icon: Keyboard,
    rotation: -90,
    translate: 200,
  },
  {
    id: "audio",
    path: "/Audio",
    icon: Mic,
    rotation: 90,
    translate: 135,
  },
];

export const Circularnav: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeIcon, setActiveIcon] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const activeButton = buttonsData.find(
      (button) => button.path === location.pathname
    );
    setActiveIcon(activeButton?.id || null);
  }, [location.pathname]);

  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleButtonClick = (buttonId: string, path: string) => {
    setActiveIcon(buttonId); 
    setIsExpanded(true); 
    setTimeout(() => {
      navigate(path);
    }, 1000); 
  };

  const getClockwiseRotation = (current: number, target: number): number => {
    current = (current + 360) % 360; // Normalize current rotation
    target = (target + 360) % 360; // Normalize target rotation
    
    if (target >= current) {
      return target - current; // Normal clockwise transition
    }
    return 360 - current + target; // Wrap-around clockwise transition
  };

  const getButtonStyles = (button: ButtonData, index: number) => {
    const activeIndex = buttonsData.findIndex((b) => b.id === activeIcon);
  
    // Relative index wrap-around logic
    const relativeIndex = (index - activeIndex + buttonsData.length) % buttonsData.length;
  
    const currentRotation = button.rotation;
    const targetRotation = buttonsData[relativeIndex].rotation;
  
    // Calculate proper clockwise rotation
    const finalRotation = currentRotation + getClockwiseRotation(currentRotation, targetRotation);
  
    console.log(
      `Icon "${button.id}" transition details:`,
      `- Current: ${currentRotation}°`,
      `- Target: ${targetRotation}°`,
      `- Final (Clockwise): ${finalRotation}°`,
      `- Relative Index: ${relativeIndex}`
    );
  
    return {
      transform: `rotate(${finalRotation % 360}deg) translate(${buttonsData[relativeIndex].translate}px)`,
      transition: "transform 0.5s ease-in-out",
      "--inner-icon-rotation": `${-finalRotation % 360}deg`,
    } as React.CSSProperties;
  };

  return (
    <div
      className="fixed top-2/4 left-10 w-10 h-10 -mt-20 cursor-pointer"
      onMouseEnter={handleToggleExpand}
      onMouseLeave={() => !isExpanded && setIsExpanded(false)}
    >
      <img src={Ellipse} alt="Ellipse" className="w-full h-full" />
      <div
        className={`absolute inset-0 m-auto transition-transform duration-300 ${
          isExpanded ? "rotate-45" : ""
        }`}
      >
        <img src={Plus} alt="Plus" className="p-1.5" />
      </div>
      {isExpanded && (
        <div className="expanded-items">
          <img
            src={Semicircle}
            alt="semicircle"
            className="semicircle absolute -inset-4 transform scale-500"
          />
          {buttonsData.map((button, index) => (
            <div
              key={button.id}
              className={`icon-container absolute ${
                activeIcon === button.id ? "active" : ""
              }`}
              style={{
                ...getButtonStyles(button, index),
                ...(activeIcon === button.id && {
                  boxShadow:
                    "0 0 15px 10px rgba(255,0,255,0.5), 0 0 25px 15px rgba(0,255,255,0.3)",
                  border: "4px solid white",
                  borderRadius: "50%",
                }),
              }}
            >
              <Link
                to={button.path}
                onClick={(e) => {
                  e.preventDefault();
                  handleButtonClick(button.id, button.path);
                }}
              >
                <div
                  className= "icon w-14 h-14 bg-black rounded-full border-2 border-gray-500 flex items-center justify-center hover:scale-110 hover:border-white hover:border-4 hover:shadow-[0_0_15px_10px_rgba(255,0,255,0.5),0_0_25px_15px_rgba(0,255,255,0.3)] md:w-10 md:h-10 sm:w-8 sm:h-8"
                  
                >
                  <img
                    src={button.icon}
                    alt={button.id}
                    className="icon-image w-6 h-6 hover:brightness-150 md:w-5 md:h-5 sm:w-4 sm:h-4"
                     
                    style={{
                      transform: `rotate(var(--inner-icon-rotation, 0deg))`,
                    }}
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
Circularnav.displayName = "Circularnav";
