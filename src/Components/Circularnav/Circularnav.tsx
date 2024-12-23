import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Circularnav.css";
import Plus from "../../assets/Plus.svg";
import Ellipse from "../../assets/Ellipse.svg";
import Mic from "../../assets/Mic.svg";
import Avatar from "../../assets/Avatar Placeholder.svg";
import Keyboard from "../../assets/Keyboard.svg";

type Icon = {
  id: number;
  label: string;
  image: string;
  path: string;
};

const icons: Icon[] = [
  { id: 1, label: "Avatar", path: '/avatar', image: Avatar },
  { id: 2, label: "Keyboard", path: '/home', image: Keyboard },
  { id: 3, label: "Mic", path: '/Audio', image: Mic },
];

export const Circularnav: React.FC = () => {
  const [rotation, setRotation] = useState(0); // Tracks the current rotation
  const [currentIndex, setCurrentIndex] = useState(0); // Tracks the currently active icon
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const circleRef = useRef<HTMLDivElement>(null); // Reference for circle container

  useEffect(() => {
    const activeButton = icons.find((icon) => icon.path === location.pathname);
    if (activeButton) {
      const activeIndex = activeButton.id - 1;
      setCurrentIndex(activeIndex);
      setRotation(activeIndex * 120); // Ensure the rotation matches the active icon
    }
  }, [location.pathname]);

  const handleToggleExpand = () => {
    setIsExpanded(true);
  };

  const handleRotate = (clickedIndex: number) => {
    const totalIcons = icons.length;
    const diff = clickedIndex - currentIndex;

    // Calculate shortest rotation
    const shortestRotation =
      diff > 0
        ? diff <= totalIcons / 2
          ? diff
          : diff - totalIcons
        : diff >= -totalIcons / 2
        ? diff
        : diff + totalIcons;

    setRotation((prev) => prev + shortestRotation * 120); // Rotate by 120 degrees per icon
    setCurrentIndex(clickedIndex); // Update the active index
    setIsExpanded(true); // Expand the navigation
    setTimeout(() => {
      // navigate(icons[clickedIndex].path); // Navigate to the path
    }, 1000); // Adjust the timeout duration as per your transition time
  };

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    // If the mouse leaves the circle area, close the expanded menu
    if (!circleRef.current?.contains(e.relatedTarget as Node)) {
      setTimeout(() => {
      setIsExpanded(false);
      }, 100);
    }
  };

  return (
    <div
      className="fixed top-2/4 left-10 w-10 h-10 -mt-20 cursor-pointer"
      ref={circleRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
          <span className="semicircle"></span>

          <div className="semicircle-container" style={{ transform: `rotate(${rotation}deg)` }}>
            {icons.map((icon, index) => (
              <div
                key={icon.id}
                className={`icon ${currentIndex === index ? "active" : "icon  bg-black rounded-full border-2 border-gray-500 flex items-center justify-center hover:scale-110 hover:border-white hover:border-4 hover:shadow-[0_0_15px_10px_rgba(255,0,255,0.5),0_0_25px_15px_rgba(0,255,255,0.3)] "}`}
                onClick={() => handleRotate(index)}
                style={{
                  transform: `rotate(${-index * 120}deg) translateX(${index === currentIndex ? 70 : 165}px) rotate(${index * 120}deg)`,
                  boxShadow: currentIndex === index ? "0 0 15px 10px rgba(255,0,255,0.5), 0 0 25px 15px rgba(0,255,255,0.3)" : "",
                  border: currentIndex === index ? "4px solid white" : "",
                  borderRadius: "50%",
                }}
              >
                <div
                  className="icon-image-wrapper"
                  style={{
                    padding: "10px",
                    transition: "transform 0.659s",
                    transform: `rotate(${-rotation}deg)`, // Counter the parent rotation to keep the icon upright
                  }}
                >
                  <img src={icon.image} alt={icon.label} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

Circularnav.displayName = "Circularnav";
