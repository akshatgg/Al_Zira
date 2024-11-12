import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { handleEmailLogin } from '../../redux/Slice/AuthSlice';
import backgroundImage from '@/assets/Login_Bg.svg';
import Logo from '@/assets/Logo.svg';
import Google from '@/assets/Google.svg';
import Github from '@/assets/Github.svg';
import Facebook from '@/assets/Facebook.svg';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { user, loading, error, rememberMe } = useSelector((state: RootState) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [rememberMeState, setRememberMeState] = useState(rememberMe);

  useEffect(() => {
    if (user) {
      console.log('User data updated:', user.displayName, user.email);
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(
        handleEmailLogin({ email: formData.email, password: formData.password, rememberMe: rememberMeState })
      );

      if (handleEmailLogin.fulfilled.match(resultAction)) {
        navigate('/'); // Redirect to home if login is successful
      } else {
        console.error(resultAction.payload);  // Log any error message
      }
    } catch (e) {
      console.error(e.message);
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
          <h1 className="lg:text-7xl md:text-6xl font-sans font-semibold mb-4">Welcome Back .!</h1>
        </div>
        <div className='flex-0 lg:pr-10 md:pr-5'>
          <div className="text-white border border-white bg-transparent lg:p-10 md:p-6 rounded-2xl shadow-lg">
            <h2 className="lg:text-3xl md:text-2xl font-sans font-semibold mb-1 mt-4">Login</h2>
            {error && (
              <div className="bg-red-500 bg-opacity-20 border border-red-500 text-white p-3 rounded-lg mb-4">
                <p className="text-sm">{error}</p>
              </div>
            )}
            <form onSubmit={handleFormSubmit} className='mb-4'>
              <div className="mb-4">
                <input
                  className="border border-white bg-transparent w-full lg:px-4 lg:py-2 md:px-2 md:py-1 text-white rounded-lg focus:outline-none"
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4 relative">
                <input
                  className="border border-white text-white bg-transparent w-full lg:px-4 lg:py-2 md:px-2 md:py-1 rounded-lg focus:outline-none"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-400 hover:text-white"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`mb-2 bg-gradient-to-r from-[#6586FA] to-[#6B1C99] rounded-lg text-white lg:py-[2%] md:py-[1%] w-full cursor-pointer text-lg font-light transition duration-300 hover:from-[#5263D8] hover:to-[#4E167A] ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
