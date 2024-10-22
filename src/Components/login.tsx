import React from 'react';
import backgroundImage from '../assets/background.svg';
import Logo from "../assets/Logo.svg";
import Google from "../assets/Google.svg";
import Github from "../assets/Github.svg";
import Facebook from "../assets/Facebook.svg";

export const Login: React.FC = () => {
  return (
    <div className="flex-1 items-center min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100%',
        width: '100%',
      }}
    >

      <div className="p-10">
        <img src={Logo} alt="Logo" />
      </div>

      <div className='flex'>
        <div className="text-white flex-1 pl-20 pt-20 mt-20">
          <h1 className="text-7xl font-sans font-semibold mb-4">Welcome Back .!</h1>
          <div className="flex items-center justify-center my-6">
            <button className="border border-white px-6 py-2 italic font-semibold hover:bg-white hover:text-black transition duration-300">
              Skip the lag ?
            </button>
            <div className="w-5/6 border-t-2 border-dashed border-gray-700"></div>
          </div>
        </div>

        <div className="flex-none w-1/4 text-white border border-white bg-transparent backdrop-filter backdrop-blur-md p-10 rounded-2xl shadow-lg mb-20 mr-20">
          <h2 className="text-3xl font-sans font-semibold mb-0 mt-4">Login</h2>
          <p className="mb-2">Glad you're back.!</p>

          <form className='mb-4'>
            <div className="mb-4">
              <input
                className="border border-white bg-transparent w-full px-4 py-2 text-white rounded-lg focus:outline-none"
                id="username"
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="mb-0">
              <input
                className="border border-white bg-transparent w-full px-4 py-2 text-black rounded-lg focus:outline-none"
                id="password"
                type="password"
                placeholder="Password"
              />
            </div>

            <div className="flex items-center mb-4">
              <input
                id="remember-me"
                type="checkbox"
                className="mr-2 rounded text-indigo-500 focus:ring-indigo-500"
              />
              <label htmlFor="remember-me" className="text-white">Remember me</label>
            </div>
            <div className="text-center">
              <button className="bg-blue-800 text-white font-bold py-2 px-4 rounded-lg w-full transition-all">
                Login
              </button>
            </div>
            <div className="text-center text-sm mt-0">
              <a href="/Forget_Password" className="text-white">Forget password ?</a>
            </div>
          </form>

          <div className="relative flex items-center justify-center my-6">
            <div className="w-full border-t border-gray-700"></div>
            <span className="absolute bg-black px-4 text-gray-700">Or</span>
          </div>

          <div className="flex justify-center mt-0 space-x-4">
            <button className="bg-transparent rounded-full p-2 hover:bg-gray-200 transition-all">
              <img src={Google} alt="Google" className="w-7 h-7" />
            </button>
            <button className="bg-transparent rounded-full p-2 hover:bg-gray-200 transition-all">
              <img src={Facebook} alt="Facebook" className="w-7 h-7" />
            </button>
            <button className="bg-transparent rounded-full p-2 hover:bg-gray-200 transition-all">
              <img src={Github} alt="Github" className="w-7 h-7" />
            </button>
          </div>

          <div className="text-center text-sm mt-4">
            Don't have an account ? <a href="/Signup" className="text-white">Signup</a>
          </div>

          <div className="flex justify-center mt-2 space-x-4 text-sm">
            <a href="/" className="text-white">Terms & Conditions</a>
            <a href="/" className="text-white">Support</a>
            <a href="/" className="text-white">Customer Care</a>
          </div>
        </div>
      </div>
    </div>
  );
};


Login.displayName = 'Login';
export default Login;
