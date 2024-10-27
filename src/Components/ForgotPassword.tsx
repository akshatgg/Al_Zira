import React from 'react';
import backgroundImage from '../assets/ForgetPassword_Bg.svg';
import Logo from "../assets/Logo.svg";

export const ForgetPassword: React.FC = () => {
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
                    <h1 className="text-7xl font-sans font-semibold mb-4">No Worries.!!</h1>
                    <div className="flex items-center justify-center my-6">
                        <button className="border border-white px-6 py-2 italic font-semibold hover:bg-white hover:text-black transition duration-300">
                            Take me back.!
                        </button>
                        <div className="w-5/6 border-t-2 border-dashed border-gray-700"></div>
                    </div>
                </div>


<div className='flex-0 pr-10'>
                <div className=" text-white border border-white bg-transparent backdrop-filter backdrop-blur-md p-10 rounded-2xl shadow-lg">
                    <h2 className="text-3xl font-sans font-semibold mb-0 mt-4">Forgot Password ?</h2>
                    <p className="mb-2">Please enter your email</p>

                    <form className='mb-12'>
                        <div className="mb-4">
                            <input
                                className="border border-white bg-transparent w-full px-4 py-2 text-black rounded-lg focus:outline-none"
                                id="email"
                                type="email"
                                placeholder="example@mail.com"
                            />
                        </div>

                        <div className="text-center">
                        <button className="bg-gradient-to-r from-[#E446B9] to-[#7A0731] text-white font-bold py-2 px-4 rounded-lg w-full transition-all duration-300 hover:from-[#C9369E] hover:to-[#640627]">
  Reset Password
</button>


                        </div>
                    </form>

                    <div className="text-center text-sm mt-[80%]">
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
        </div>
    );
};


ForgetPassword.displayName = 'ForgetPassword';
export default ForgetPassword;
