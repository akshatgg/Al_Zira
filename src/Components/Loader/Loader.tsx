import React, { useEffect, useState } from 'react';
import './Loader.css';
import Logo from "../../assets/Logo.svg";
export const Loader: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5500); // Delay by 5.5 seconds
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <div className="container">
      <div className="container2 flex item-center justify-center">
        <img src={Logo} alt="logo" className="img" />
        {/* <div className={`content ${isVisible ? 'visible' : ''}`}>F.R.I.D.A.Y</div> */}
      </div>
      <div className="oval"></div>
    </div>
  );
};

export default Loader;








// 90% {
//   transform: translateX(-100px) translateY(50%) scale(0.7);
// }

// /* Shake effect */
// 93% {
//   transform: translateX(-95px) translateY(50%) scale(0.7);
// }
// 96% {
//   transform: translateX(-105px) translateY(50%) scale(0.7);
// }
// 100% {
//   opacity: 1;
//   transform: translateX(-100px) translateY(50%) scale(0.7);
// }



// body {
//     background-color: black;
//     margin: 0;
//     height: 100vh;
//     display: flex;
//     align-items: center;
//     justify-content: center;
// }

// .container {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     height: 100%;
//     flex-direction: column;
// }

// .oval {
//     width: 400px;
//     height: 150px;
//     background-color: #04181D;
//     border-radius: 50%;
//     animation: shrink 1s cubic-bezier(0.2, 0.055, 0.775, 0.29) forwards;
//     animation-delay: 1.2s;
//     transform-origin: bottom;
// }

// @keyframes shrink {
//     0% {
//         transform: scale(1);
//     }

//     100% {
//         transform: scale(0);
//     }
// }
// .img {
//     width: 100px;
//     height: 200px;
//     position: relative;
//     bottom: 80px;
//     opacity: 0;
//     animation: fadeIn 0.5s 2s forwards, movedown 1s 2s forwards, jiggle 2s 3s ease-in-out forwards, shiftLeft 2s 5s forwards, shake 2s 7s ease-in-out forwards;
//     left: 0; /* Start position */
// }

// @keyframes fadeIn {
//     from {
//         opacity: 0;
//     }
//     to {
//         opacity: 1;
//     }
// }

// @keyframes movedown {
//     0% {
//         transform: translateY(0) scale(1);
//     }
//     100% {
//         transform: translateY(100px) scale(0.7); /* Move image down */
//     } 
// }

// @keyframes jiggle {
//     0% {
//         transform: translateY(100px) scale(0.7);
//     }
//     20% {
//         transform: translateY(105px) scale(0.72);
//     }
//     40% {
//         transform: translateY(98px) scale(0.7);
//     }
//     60% {
//         transform: translateY(102px) scale(0.72);
//     }
//     80% {
//         transform: translateY(99px) scale(0.7);
//     }
//     100% {
//         transform: translateY(100px) scale(0.7); /* Return to original position */
//     }
// }

// @keyframes shiftLeft {
//     0% {
//         left: 0;
//         transform: translateY(50%) scale(0.7);
//     }
//     100% {
//         left: -100px;
//         transform: translateY(50%) scale(0.7); /* Shift the image left */
//     }
// }

// @keyframes shake {
//     0% {
//         transform: translateX(0px) translateY(50%) scale(0.7);
//     }
//     25% {
//         transform: translateX(10px) translateY(50%) scale(0.7);
//     }
//     50% {
//         transform: translateX(-5px) translateY(50%) scale(0.7);
//     }
//     75% {
//         transform: translateX(2px) translateY(50%) scale(0.7);
//     }
//     100% {
//         transform: translateX(0px) translateY(50%) scale(0.7);
//     }
// }




// .content {
//     color: white;
//     position: relative;
//     display: none;
//     font-size:x-large; /* Initially hidden with no space taken */
// }
// @keyframes shift {
//     0% {
//         left: 0;
     
//     }
//     100% {
//         left: -50px;
       
//     }
// }
// .content.visible {
//     display: block; /* Set to block after the delay */
//     animation: fadeInAndSlide 1s forwards, shift 0s 0s forwards; /* Start the animation after making it visible */
// }

// @keyframes fadeInAndSlide {
//     0% {
//         opacity: 0;
//         transform: translateX(20px) translateY(50%);
//     }
//     100% {
//         opacity: 1;
//         transform: translateX(0) translateY(50%);
//     }
// }


// will you bounce it more properly to img