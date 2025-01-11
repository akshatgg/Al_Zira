import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../assets/ForgetPassword_Bg.svg';
import Logo from "../../assets/Logo.svg";

export const ForgetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const auth = getAuth();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess('Password reset email sent! Please check your inbox.');
      setTimeout(() => navigate('/login'), 3000);
    } catch (error: any) {
      switch (error.code) {
        case 'auth/user-not-found':
          setError('No account found with this email.');
          break;
        case 'auth/invalid-email':
          setError('Please enter a valid email address.');
          break;
        default:
          setError('Failed to send reset email. Please try again.');
      }
    } finally {
      setLoading(false);
    }
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

      <div className='flex'>
        <div className="text-white flex-1 pl-20 pt-20 mt-20">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-sans font-semibold mb-4">No Worries.!!</h1>
          <div className="flex items-center justify-center my-6">
            <button 
              onClick={() => navigate('/login')}
              className="border border-white md:px-3 lg:px-6 lg:py-2 italic font-semibold hover:bg-white hover:text-black transition duration-300"
            >
              Take me back.!
            </button>
            <div className="w-5/6 border-t-2 border-dashed border-gray-700"></div>
          </div>
        </div>

        <div className='flex-0 lg:pr-10 md:pr-5'>
          <div className="text-white border border-white bg-transparent backdrop-filter backdrop-blur-md lg:p-10 md:p-6 rounded-2xl shadow-lg">
            <h2 className="lg:text-3xl md:text-2xl font-sans font-semibold mb-2 mt-4">Forgot Password ?</h2>
            <p className="mb-2 md:text-sm">Please enter your email</p>

            {error && (
              <div className="bg-red-500 bg-opacity-20 border border-red-500 text-white p-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-500 bg-opacity-20 border border-green-500 text-white p-3 rounded-lg mb-4">
                {success}
              </div>
            )}

            <form onSubmit={handleResetPassword} className='mb-12'>
              <div className="mb-4">
                <input
                  className="border border-white bg-transparent w-full lg:px-4 lg:py-2 md:px-2 md:py-1 text-white rounded-lg focus:outline-none"
                  id="email"
                  type="email"
                  placeholder="example@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className={`bg-gradient-to-r from-[#E446B9] to-[#7A0731] text-white font-bold lg:py-2 lg:px-4 md:py-1 md:px-2 rounded-lg w-full transition-all duration-300 hover:from-[#C9369E] hover:to-[#640627] ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'Sending...' : 'Reset Password'}
                </button>
              </div>
            </form>

            <div className="text-center text-sm lg:mt-[80%] md:mt-[75%]">
              Don't have an account ? <a href="/signup" className="text-white hover:underline">Signup</a>
            </div>

            <div className="flex justify-center mt-2 space-x-4 text-sm">
              <a href="/" className="text-white hover:underline">Terms & Conditions</a>
              <a href="/" className="text-white hover:underline">Support</a>
              <a href="/" className="text-white hover:underline">Customer Care</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


ForgetPassword.displayName = 'ForgetPassword';
export default ForgetPassword;
