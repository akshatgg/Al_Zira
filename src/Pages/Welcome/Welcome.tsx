import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
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
import './Welcome.css';

const Welcome: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 3;

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
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
        <div className="relative w-full h-screen overflow-hidden bg-black" {...handlers} onClick={handleClick}>
            <div
                className="flex h-full transition-transform duration-500 ease-in-out  mx-auto"
                style={{ transform: `translateX(-${(currentPage - 1) * 100}%)` }}
            >
                {/* Page 1 */}
                <div className="pages flex flex-col justify-center items-center text-center min-w-full h-full">
                    <div id='page1' className="relative w-full h-[65%] flex justify-center items-center -mt-32 bg-center" style={{ backgroundImage: `url(${Background1})` }}>
                        <img src={DotsTop} alt="Decorative dots" className="absolute top-[15%] left-1/2 transform -translate-x-1/2 z-20 max-w-full h-auto" />
                        <img src={Hands} alt="Hands" className="absolute bottom-[20%] left-1/2 transform -translate-x-1/2 z-20 max-w-full h-auto" />
                        <img src={HomeAICompanion} alt="AI Companion" className="absolute max-w-full h-auto" />
                    </div>
                    <h1 className="text-white font-bold  mb-0 max-w-[896px]">Your AI Companion, Anytime, Anywhere</h1>
                    <h2 className="text-gray-400 font-semibold  mb-5">Connect with F.R.I.D.A.Y</h2>
                    <p className="text-gray-400 font-medium  max-w-[968px]">
                        Meet F.R.I.D.A.Y.—your always-available AI assistant. Chat through text or interact with a dynamic
                        avatar, getting real-time, human-like responses. It's not just a chatbot; it’s an intelligent companion
                        that’s ready to make your life easier, one conversation at a time.
                    </p>
                </div>

                {/* Page 2 */}
                <div className="pages flex flex-col justify-center items-center text-center min-w-full h-full">
                    <div id='page2' className="relative w-full h-[65%] flex justify-center items-center -mt-32 bg-center" style={{ backgroundImage: `url(${Background2})` }}>
                        <img src={Eclipse3} alt="Eclipse background" className="absolute  max-w-full h-auto" />
                        <img src={Home2} alt="Illustration" className="absolute max-w-full h-auto" />
                    </div>
                    <h1 className="text-white font-bold  mb-0 max-w-[896px]">Tailored to you, Secured for you</h1>
                    <h2 className="text-gray-400 font-semibold  mb-5">Smarter Assistance, Secured with Advanced Privacy</h2>
                    <p className="text-gray-400 font-medium  max-w-[968px]">
                        F.R.I.D.A.Y. learns from your preferences to deliver personalized, smarter assistance every time. Your data
                        and privacy are our top priorities, with advanced encryption ensuring your information is always safe.
                        Experience AI that knows you, while keeping your data fully protected.
                    </p>
                </div>

                {/* Page 3 */}
                <div className="pages flex flex-col justify-center items-center text-center min-w-full h-full">
                    <div id='page3' className="relative w-full h-[65%] flex justify-center items-center -mt-32 bg-center" style={{ backgroundImage: `url(${Background1})` }}>
                        <img src={Group3} id='group3' alt="Decorative Group 3" className="absolute max-w-[220px] h-auto" />
                        <img src={Group2} id='group2' alt="Decorative Group 2" className="absolute max-w-[220px] h-auto" />
                        <img src={Group1} id='group1' alt="Decorative Group 1" className="absolute max-w-[180px] h-auto" />
                        <img src={HomeAICompanion} alt="AI Companion" className="absolute max-w-full h-auto" />
                    </div>
                    <h1 className="text-white font-bold  mb-0 max-w-[896px]">Voice Activated and Life-like Avatar</h1>
                    <h2 className="text-gray-400 font-semibold  mb-5">Speak Naturally, Interact Seamlessly</h2>
                    <p className="text-gray-400 font-medium  max-w-[968px]">
                        F.R.I.D.A.Y.'s advanced voice capabilities allow you to talk naturally and get instant, human-like responses. Paired
                        with a lifelike avatar, it delivers an engaging experience that feels less like technology and more like
                        a real conversation. Just speak, and F.R.I.D.A.Y. is ready to assist.
                    </p>
                </div>
            </div>

            <div className="absolute bottom-[60px] w-full flex justify-center items-center">
                {[...Array(totalPages)].map((_, index) => (
                    <span
                        key={index}
                        className={`w-[12px] h-[12px] mx-2 rounded-full transition-colors duration-300 cursor-pointer ${currentPage === index + 1 ? 'bg-gray-800' : 'bg-gray-300'}`}
                        onClick={() => handlePageChange(index + 1)}
                        tabIndex={0}
                        role="button"
                        aria-label={`Go to page ${index + 1}`}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default Welcome;
