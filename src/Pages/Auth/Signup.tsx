import React from 'react';
import backgroundImage from '../../assets/Signup_Bg.svg';
import Logo from "../../assets/Logo.svg";
import Google from "../../assets/Google.svg";
import Github from "../../assets/Github.svg";
import Facebook from "../../assets/Facebook.svg";

const Signup: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
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

      <div className="flex">

        <div className="text-white flex-1 pl-20 pt-20 mt-20">
          <h1 className="text-7xl font-sans font-semibold mb-4">Roll the Carpet .!</h1>
          <div className="flex items-center justify-center my-6">
            <button className="border border-white px-6 py-2 italic font-semibold hover:bg-white hover:text-black transition duration-300">
              Skip the lag?
            </button>
            <div className="w-5/6 border-t-2 border-dashed border-gray-700"></div>
          </div>
        </div>

       <div className='flex-0 pr-10 pb-4'>
        <div className=" text-white border border-white bg-transparent backdrop-filter backdrop-blur-md p-10 rounded-2xl shadow-lg ">
          <h2 className="text-3xl font-sans font-semibold mb-0 mt-4">Signup</h2>
          <p className="mb-2">Just some details to get you in!</p>

          <form>
            <div className="mb-4">
              <input
                className="border border-white bg-transparent w-full px-4 py-2 text-white rounded-lg focus:outline-none"
                id="username"
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="mb-4">
              <input
                className="border border-white bg-transparent w-full px-4 py-2 text-black rounded-lg focus:outline-none"
                id="email"
                type="email"
                placeholder="Email/Phone"
              />
            </div>
            
            <div className="mb-4 relative">
                <input
                  className="border border-white text-white bg-transparent w-full px-4 py-2 rounded-lg focus:outline-none"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-400 hover:text-white"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <div className="mb-4 relative">
                <input
                  className="border border-white text-white bg-transparent w-full px-4 py-2 rounded-lg focus:outline-none"
                  id="Confirmpassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-400 hover:text-white"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            <div className="text-center">
            <button className="mb-2 bg-gradient-to-r from-[#2E4DEF] to-[#0E148E] rounded-lg text-white py-[2%] w-full cursor-pointer text-lg font-light transition duration-300 hover:from-[#253CBF] hover:to-[#0A106D]">
  Signup
</button>

            </div>
          </form>

          <div className="relative flex items-center justify-center my-6">
            <div className="w-full border-t border-gray-700"></div>
            <span className="absolute bg-black px-4 text-gray-700">Or</span>
          </div>

          <div className='flex justify-center'>
            <div className="flex justify-center space-x-4">
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
          </div>

          <div className="text-center text-sm mt-4">
            Already Registered ? <a href="/" className="text-white">Login</a>
          </div>

          <div className="flex justify-center mt-2 space-x-4 text-sm">
            <a href="/" className="text-white">Terms & Conditions</a>
            <a href="/" className="text-white">Support</a>
            <a href="/" className="text-white">Customer Care</a>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

Signup.displayName = 'Signup';
export default Signup;