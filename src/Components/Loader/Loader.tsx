import React from 'react';
import './Loader.css';
import Logo from '../../assets/Logo.svg';

export const Loader: React.FC = () => {
  return (
    <div className="container">
      <div className="container2 flex item-center justify-center">
      <img src={Logo} alt="logo" className="img" />
      <div className="content">F.R.I.D.A.Y</div>
      </div>
      <div className="oval"></div>
    </div>
  );
};

Loader.displayName = 'Loader';
export default Loader;
