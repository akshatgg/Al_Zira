import React from 'react';
import backgroundImage from '../assets/background.svg';


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

          
         
    </div>
  );
};


Login.displayName = 'Login';
export default Login;
