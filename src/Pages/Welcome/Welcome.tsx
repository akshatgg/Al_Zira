import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useNavigate } from 'react-router-dom'; // For navigation
import HomeAICompanion from '../../assets/Home 1 Ellipse .svg';
import Hands from '../../assets/Home 1 image bottom.svg';
import DotsTop from '../../assets/Home 1 image top.svg';
import Home2 from '../../assets/Home 2 Ellipse 1.svg';
import Group1 from '../../assets/Group 1.svg';
import Group2 from '../../assets/Group 2.svg';
import Group3 from '../../assets/Group 3.svg';
import Eclipse3 from '../../assets/Ellipse 3.svg';
import Background1 from '../../assets/Home_1_Ellipse_2.svg';
import Background2 from '../../assets/Ellipse_2.svg';
import './welcome.css';

const Welcome: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;
  const navigate = useNavigate();

  const handlePageChange = (page: number) => {
    if (page > totalPages) {
      // Navigate to loader or another route
      navigate('/loader'); // Change '/loader' to your desired route
    } else if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handlePageChange(currentPage + 1),
    onSwipedRight: () => handlePageChange(currentPage - 1),
    trackMouse: true,
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        handlePageChange(currentPage - 1);
      } else if (event.key === 'ArrowRight') {
        handlePageChange(currentPage + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentPage]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { clientX, currentTarget } = event;
    const { offsetWidth } = currentTarget;
    if (clientX < offsetWidth / 2) {
      handlePageChange(currentPage - 1);
    } else {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-black"
      {...handlers}
      onClick={handleClick}
    >
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${(currentPage - 1) * 100}%)` }}
      >
        {/* Page 1 */}
        <div className="pages flex flex-col justify-center items-center text-center min-w-full h-full">
          <div
            id="page1"
            className="relative w-full h-[55%] flex justify-center items-center -mt-32 mb-6 bg-center bg-cover laptop:bg-contain"
            style={{ backgroundImage: `url(${Background1})` }}
          >
            <div
              className="relative flex justify-center items-center circular-bg"
              style={{ backgroundImage: `url(${HomeAICompanion})` }}
            >
              <img
                src={DotsTop}
                alt="Decorative dots at the top"
                className="absolute top-[10%] left-1/2 transform -translate-x-1/2 z-20 max-w-[150px] laptop:max-w-[125px] xl:max-w-[150px] xl:top-[1%]"
              />
              <img
                src={Hands}
                alt="Illustration of hands"
                className="absolute bottom-[15%] left-1/2 transform -translate-x-1/2 z-20 max-w-[150px] laptop:max-w-[140px] xl:max-w-[180px] xl:bottom-[10%]"
              />
            </div>
          </div>
          <h1 className="text-white font-bold mb-0 max-w-[896px] text-2xl laptop:text-3xl xl:text-3xl">
            Your AI Companion, Anytime, Anywhere
          </h1>
          <h2 className="text-gray-400 font-semibold mt-2 mb-5 text-md laptop:text-xl xl:text-xl">
            Connect with F.R.I.D.A.Y
          </h2>
          <p className="text-gray-400 font-bold max-w-[768px] xl:text-[1rem]">
            Meet F.R.I.D.A.Y.—your always-available AI assistant. Chat through text or interact with a dynamic avatar, getting real-time, human-like responses. It's not just a chatbot; it’s an intelligent companion that’s ready to make your life easier, one conversation at a time.
          </p>
        </div>

        {/* Page 2 */}
        <div className="pages flex flex-col justify-center items-center text-center min-w-full h-full">
          <div
            id="page2"
            className="relative w-full h-[55%] flex justify-center items-center -mt-32 mb-6 bg-center bg-cover laptop:bg-contain"
            style={{ backgroundImage: `url(${Background2})` }}
          >
            <div
              className="relative flex justify-center items-center circular-bg"
              style={{ backgroundImage: `url(${Eclipse3})` }}
            >
              <img
                src={Home2}
                alt="Illustration"
                className="absolute max-w-[400px] laptop:max-w-[360px] xl:max-w-[400px]"
              />
            </div>
          </div>
          <h1 className="text-white font-bold mb-0 max-w-[896px] text-2xl laptop:text-3xl xl:text-3xl">
            Tailored to you, Secured for you
          </h1>
          <h2 className="text-gray-400 font-semibold mt-2 mb-5 text-md laptop:text-xl xl:text-xl">
            Smarter Assistance, Secured with Advanced Privacy
          </h2>
          <p className="text-gray-400 font-bold max-w-[768px] xl:text-[1rem]">
            F.R.I.D.A.Y. learns from your preferences to deliver personalized, smarter assistance every time. Your data and privacy are our top priorities, with advanced encryption ensuring your information is always safe. Experience AI that knows you, while keeping your data fully protected.
          </p>
        </div>

        {/* Page 3 */}
        <div className="pages flex flex-col justify-center items-center text-center min-w-full h-full">
          <div
            id="page3"
            className="relative w-full h-[55%] flex justify-center items-center -mt-32 mb-6 bg-center bg-cover laptop:bg-contain"
            style={{ backgroundImage: `url(${Background1})` }}
          >
            <div
              className="relative flex justify-center items-center circular-bg"
              style={{ backgroundImage: `url(${HomeAICompanion})` }}
            >
              <img
                src={Group2}
                alt="Decorative Group 2"
                className="absolute max-w-[190px] top-[40%] laptop:max-w-[150px] xl:max-w-[190px] xl:top-[40%] xl:right-[26%]"
              />
              <img
                src={Group3}
                alt="Decorative Group 3"
                className="absolute max-w-[190px] top-[10%] laptop:max-w-[150px] xl:max-w-[190px] xl:top-[5%] xl:left-[26%]"
              />
              <img
                src={Group1}
                alt="Decorative Group 1"
                className="absolute max-w-[170px] bottom-[48%] laptop:max-w-[120px] xl:max-w-[170px] xl:bottom-[48%] xl:left-[28%]"
              />
            </div>
          </div>
          <h1 className="text-white font-bold mb-0 max-w-[896px] text-2xl laptop:text-3xl xl:text-3xl">
            Voice Activated and Life-like Avatar
          </h1>
          <h2 className="text-gray-400 font-semibold mt-2 mb-5 text-md laptop:text-xl xl:text-xl">
            Speak Naturally, Interact Seamlessly
          </h2>
          <p className="text-gray-400 font-bold max-w-[768px] xl:text-[1rem]">
            F.R.I.D.A.Y.'s advanced voice capabilities allow you to talk naturally and get instant, human-like responses. Paired with a lifelike avatar, it delivers an engaging experience that feels less like technology and more like a real conversation. Just speak, and F.R.I.D.A.Y. is ready to assist.
          </p>
        </div>
      </div>

      {/* Pagination Indicators */}
      <div className="absolute bottom-[100px] w-full flex justify-center items-center">
        {[...Array(totalPages)].map((_, index) => (
          <span
            key={index}
            className={`w-[8px] h-[8px] mx-2 rounded-full transition-colors duration-300 cursor-pointer ${
              currentPage === index + 1 ? 'bg-white' : 'bg-gray-600'
            }`}
            onClick={() => handlePageChange(index + 1)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Welcome;
