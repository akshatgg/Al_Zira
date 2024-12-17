import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Plus from '../../assets/Plus.svg';
import Ellipse from '../../assets/Ellipse.svg';
import Mic from '../../assets/Mic.svg';
import Avatar from '../../assets/Avatar Placeholder.svg';
import Keyboard from '../../assets/Keyboard.svg';
import './Circularnav.css';

type ButtonData = {
  id: string;
  icon: string;
  path: string;
};

const buttonsData: ButtonData[] = [
  { id: 'avatar', icon: Avatar, path: '/avatar' },
  { id: 'prompt', icon: Keyboard, path: '/home' },
  { id: 'audio', icon: Mic, path: '/audio' },
];

export const Circularnav: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeIcon, setActiveIcon] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const activeButton = buttonsData.find(
      (button) => button.path === location.pathname
    );
    setActiveIcon(activeButton?.id || null);
  }, [location.pathname]);

  const handleButtonClick = (buttonId: string, path: string) => {
    if (isAnimating) return;
    setIsAnimating(true);
    const clickedButtonIndex = buttonsData.findIndex(
      (button) => button.id === buttonId
    );
    const rotatedButtons = [
      ...buttonsData.slice(clickedButtonIndex - 1),
      ...buttonsData.slice(0, clickedButtonIndex - 1),
    ];
    setTimeout(() => {
      setActiveIcon(buttonId);
      setIsAnimating(false);
      navigate(path);
      buttonsData.length = 0;
      buttonsData.push(...rotatedButtons);
    }, 1500);
  };

  const handleHover = (isHovering: boolean) => {
    setIsExpanded((prev) => !prev);
    setHovered(isHovering);
  };

  return (
    <div className='container'>
      <div
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
      >
        <div
          className={`semicircle ${isAnimating ? 'rotate' : ''} ${
            hovered ? 'visible' : 'hidden'
          }`}
        >
          {buttonsData.map((button) => (
            <div
              key={button.id}
              className={`circle ${button.id === activeIcon ? 'active' : ''}`}
              onClick={() => handleButtonClick(button.id, button.path)}
            >
              <div className='icon-container'>
                <img
                  src={button.icon}
                  alt={`${button.id} icon`}
                  className='hover:brightness-150'
                />
              </div>
            </div>
          ))}
        </div>
        <div className='ellipse'>
          <img src={Ellipse} alt='Ellipse' />
          <div className={`plus ${isExpanded ? 'rotated' : ''}`}>
            <img src={Plus} alt='Plus Icon' />
          </div>
        </div>
      </div>
    </div>
  );
};
