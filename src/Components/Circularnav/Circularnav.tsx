import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "./Circularnav.css";
import Plus from "../../assets/Plus.svg";
import Ellipse from "../../assets/Ellipse.svg";
import Mic from "../../assets/Mic.svg";
import Avatar from "../../assets/Avatar Placeholder.svg";
import Keyboard from "../../assets/Keyboard.svg";
import Semicircle from "../../assets/Semicircle.svg";

type ButtonData = {
  id: string;
  path: string;
  icon: string;
  rotation: number;
  translate: number;
};

const calculateTranslate = (base: number) => {
  const width = window.innerWidth;
  if (width < 640) return base * 0.6;
  if (width < 768) return base * 0.8;
  return base;
};

const buttonsData: ButtonData[] = [
  {
    id: "avatar",
    path: "/avatar",
    icon: Avatar,
    rotation: -35,
    translate: calculateTranslate(90),
  },
  {
    id: "prompt",
    path: "/home",
    icon: Keyboard,
    rotation: -90,
    translate: calculateTranslate(200),
  },
  {
    id: "audio",
    path: "/Audio",
    icon: Mic,
    rotation: 90,
    translate: calculateTranslate(135),
  },
];

export const Circularnav: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeIcon, setActiveIcon] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [dynamicButtons, setDynamicButtons] = useState(buttonsData);

  useEffect(() => {
    const activeButton = buttonsData.find(
      (button) => button.path === location.pathname
    );
    setActiveIcon(activeButton?.id || null);
  }, [location.pathname]);

  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev); // Toggle expand state
  };

  const handleButtonClick = (buttonId: string, path: string) => {
    setActiveIcon(buttonId);

    setIsExpanded(true);
    setTimeout(() => {
    navigate(path); 
    }, 1000);
  };
  const getButtonStyles = (button: ButtonData, index: number) => {
    const activeIndex = buttonsData.findIndex((b) => b.id === activeIcon);
    const positions = buttonsData.map((b) => ({
      rotation: b.rotation,
      translate: b.translate,
    }));
    const relativeIndex = (index - activeIndex + buttonsData.length) % buttonsData.length;
  
    return {
      transform: `rotate(${positions[relativeIndex].rotation}deg) translate(${positions[relativeIndex].translate}px)`,
      transition: "transform 0.5s ease-in-out",
      // This keeps the inner icon upright
      "--inner-icon-rotation": `${-positions[relativeIndex].rotation}deg`,
    } as React.CSSProperties;
  };

  useEffect(() => {
    const handleResize = () => {
      const updatedButtons = buttonsData.map((button) => ({
        ...button,
        translate: calculateTranslate(button.translate),
      }));
      setDynamicButtons(updatedButtons);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  
  return (
    <div
      className="fixed top-2/4 left-10 w-10 h-10 -mt-20 cursor-pointer"
      onMouseEnter={handleToggleExpand}
      onMouseLeave={handleToggleExpand}
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
              className={`icon-container absolute ${activeIcon === button.id ? "active" : ""}`}
              style={{
              ...getButtonStyles(button, index),
              ...(activeIcon === button.id && {
                boxShadow: "0 0 15px 10px rgba(255,0,255,0.5), 0 0 25px 15px rgba(0,255,255,0.3)",
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
                <div className="icon w-12 h-12 bg-black rounded-full border-2 border-gray-500 flex items-center justify-center hover:scale-110 hover:border-white hover:border-4 hover:shadow-[0_0_15px_10px_rgba(255,0,255,0.5),0_0_25px_15px_rgba(0,255,255,0.3)]" >
                <img
  src={button.icon}
  alt={button.id}
  className="icon-image w-6 h-6 hover:brightness-150"
  style={{
    transform: `rotate(var(--inner-icon-rotation, 0deg))`, // Counter-rotate the icon
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
};

Circularnav.displayName = "Circularnav";
