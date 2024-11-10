import React, { useEffect, useState } from 'react';
import './Loader.css';
import Logo from "../../assets/Logo.svg";

export const Loader: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 4500); // Delay by 5.5 seconds
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <div className="container">
      <div className="container2 flex item-center justify-center">
        <img src={Logo} alt="logo" className="img" />
        <div className={`content ${isVisible ? 'show' : ''}`}>F.R.I.D.A.Y</div>
      </div>
      <div className="oval"></div>
    </div>
  );
};

export default Loader;
