import React from 'react';
import backgroundImage from '../assets/background.svg';
import Logo from "../assets/Logo.svg"

export const Login: React.FC = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100%',
      }}
    >
    
    <div>
      <img src={Logo}/>
    </div>

    <div className='flex'>

{/* Left side */}
<div className='text-white flex-grow'>
  <div>
    Welcome Back .!
  </div>
  <div>
    <button className='mt-2'> {/* Added margin-top for spacing */}
      Skip the lag?
    </button>
  </div>
</div>

{/* Right side */}
<div className='flex-none w-1/3 text-white'> {/* Adjust width as needed */}
 jhhjj
</div>
    </div>


          
         
    </div>
  );
};


Login.displayName = 'Login';
export default Login;
