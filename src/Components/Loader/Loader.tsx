import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Loader.css';
import Logo from "../../assets/Logo.svg";

export const Loader: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 4500); // Delay by 4.5 seconds

    setTimeout(() => {
      setIsExiting(true); // Start the vanish animation
    }, 5500); // Trigger vanish animation after a slight delay

    setTimeout(() => {
      navigate('/login'); // Navigate after animation finishes
    }, 6000); // Delay slightly longer than the animation time

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [navigate]);

  return (
    <div className="loader-wrapper">
      <div className="container">
        <div className="container2 flex item-center justify-center">
          <img src={Logo} alt="logo" className={`img ${isExiting ? 'fade-out' : ''}`} />
          <div className={`content ${isVisible ? 'show' : ''} ${isExiting ? 'fade-out' : ''}`}>F.R.I.D.A.Y</div>
        </div>
        <div className="oval"></div>
      </div>
    </div>
  );
};

export default Loader;
