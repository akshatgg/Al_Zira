import React from 'react';
import Logo from '../../assets/Logo.svg';
import arrow_down from "../../assets/arrow_drop.svg";
import setting from "../../assets/settings.svg";
import shopping from "../../assets/Shopping_bag.svg";
import UserMenu from "../../Components/UserMenu/UserMenu.tsx";

export const Navbar: React.FC = () => {
  return (
    <div className="bg-black flex justify-between items-center px-4 py-3 md:px-6 lg:px-8">
      <div className="flex items-center space-x-3 md:space-x-4 lg:space-x-6">
        <div>
          <img src={Logo} alt="Logo" className="w-8 h-auto md:w-10 lg:w-12" />
        </div>
        <div className="text-white text-lg md:text-xl lg:text-2xl whitespace-nowrap">
          F.R.I.D.A.Y
        </div>
        <div className="hidden sm:block">
          <img src={arrow_down} alt="arrow_down" className="w-5 h-auto md:w-7 lg:w-9" />
        </div>
      </div>
      <div className="flex items-center space-x-4 md:space-x-6 lg:space-x-8">
        <div>
          <img
            src={shopping}
            alt="shopping"
            className="w-6 h-auto md:w-8 lg:w-10 transform translate-y-1 cursor-pointer"
          />
        </div>
        <div>
          <img
            src={setting}
            alt="setting"
            className="w-5 h-auto md:w-7 lg:w-9 transform translate-y-1 cursor-pointer"
          />
        </div>
        <div>
          <UserMenu />
        </div>
      </div>
    </div>
  );
};

Navbar.displayName = 'Navbar';
