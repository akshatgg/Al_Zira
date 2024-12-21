
import React, { useState } from 'react'
import "./Circularnav.css"
import Plus from '../../assets/Plus.svg';
import Ellipse from '../../assets/Ellipse.svg';
import Mic from '../../assets/Mic.svg';
import Avatar from '../../assets/Avatar Placeholder.svg';
import Keyboard from '../../assets/Keyboard.svg';
import Semicircle from '../../assets/Semicircle.svg';
import {Link} from 'react-router-dom'

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

          <div className="mic icon-container absolute" style={{ transform: 'rotate(-90deg) translate(200px)' }}>
            <Link to="/Audio">
            <div className="icon w-12 h-12 bg-black rounded-full border-2 border-gray-500 flex items-center justify-center rotate-90 hover:scale-110 hover:border-white hover:border-4 hover:bg-[0_0_15px_10px_rgba(255,0,255,0.5),0_0_25px_15px_rgba(0,255,255,0.3)] hover:shadow-[0_0_15px_10px_rgba(255,0,255,0.5),0_0_25px_15px_rgba(0,255,255,0.3)]">
              <img src={Mic} alt="Microphone" className="icon-image w-6 h-6 hover:brightness-150" />
            </div>
            </Link>
          </div>

          <div className="keyboard icon-container absolute" style={{ transform: 'rotate(-25deg) translate(90px)' }}>
            <div className="icon w-12 h-12 bg-black rounded-full border-2 border-gray-500 flex items-center justify-center hover:scale-110 hover:border-white hover:border-4 hover:bg-[0_0_15px_10px_rgba(255,0,255,0.5),0_0_25px_15px_rgba(0,255,255,0.3)] hover:shadow-[0_0_15px_10px_rgba(255,0,255,0.5),0_0_25px_15px_rgba(0,255,255,0.3)]">
              <img src={Keyboard} alt="Keyboard" className="icon-image w-6 h-6 hover:brightness-150" />
            </div>
          </div>

          <div className="avatar icon-container absolute" style={{ transform: 'rotate(90deg) translate(135px)' }}>
            <div className="icon w-12 h-12 bg-black rounded-full border-2 border-gray-500 flex items-center justify-center -rotate-90 hover:scale-110 hover:border-white hover:border-4 hover:bg-[0_0_15px_10px_rgba(255,0,255,0.5),0_0_25px_15px_rgba(0,255,255,0.3)] hover:shadow-[0_0_15px_10px_rgba(255,0,255,0.5),0_0_25px_15px_rgba(0,255,255,0.3)]">
              <img src={Avatar} alt="Avatar" className="icon-image w-6 h-6 hover:brightness-150" />
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

Circularnav.displayName = "Circularnav";
