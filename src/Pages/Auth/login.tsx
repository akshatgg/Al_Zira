import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { handleEmailLogin, handleSocialLogin } from '../../redux/Slice/AuthSlice';
import backgroundImage from '@/assets/Login_Bg.svg';
import Logo from '@/assets/Logo.svg';
import Google from '@/assets/Google.svg';
import Github from '@/assets/Github.svg';
import Facebook from '@/assets/Facebook.svg';
import { GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider } from 'firebase/auth';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  const { user, loading, error, rememberMe } = useSelector((state: RootState) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [rememberMeState, setRememberMeState] = useState(false);

  useEffect(() => {
    if (user) {
      console.log('User data updated:', user.displayName, user.email);
      console.log(user);
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleEmail = async (e: React.FormEvent) => {
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

  const handleSocial = async (
    e: React.FormEvent,
    provider: GoogleAuthProvider | FacebookAuthProvider | GithubAuthProvider
  ) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(handleSocialLogin(provider));
      
      if (handleSocialLogin.fulfilled.match(resultAction)) {
        navigate('/');
      } else {
        console.error('Error:', resultAction.payload);
      }
    } catch (e: any) {
      console.error('Error:', e.message);
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
        <div className="flex items-center justify-center my-6">
          <button className="border border-white px-6 py-2 italic font-semibold hover:bg-white hover:border-white hover:text-black transition duration-300">
            Skip the lag ?
          </button>
          <div className="w-5/6 border-t-2 border-dashed border-gray-700"></div>
        </div>
      </div>

      <div className='flex-0 lg:pr-10 md:pr-5'>
        <div className="text-white border border-white bg-transparent backdrop-filter backdrop-blur-md lg:p-10 md:p-6 rounded-2xl shadow-lg">
          <h2 className="lg:text-3xl md:text-2xl font-sans font-semibold mb-1 mt-4">Login</h2>
          <p className="mb-2 md:text-sm">Glad you're back.!</p>

          {error && (
            <div className="bg-red-500 bg-opacity-20 border border-red-500 text-white p-3 rounded-lg mb-4">
              <p className="text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleEmail} className='mb-4'>
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

            <div className="flex items-center mb-4">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMeState}
                onChange={(e) => setRememberMeState(e.target.checked)}
                className="mr-2 rounded text-indigo-500 focus:ring-indigo-500"
              />
              <label htmlFor="remember-me" className="text-white">Remember me</label>
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className={`mb-2 bg-gradient-to-r from-[#6586FA] to-[#6B1C99] rounded-lg text-white lg:py-[2%] md:py-[1%] w-full cursor-pointer text-lg font-light transition duration-300 hover:from-[#5263D8] hover:to-[#4E167A] ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </div>

            <div className="text-center text-sm mt-0">
              <a href="/Forgot_Password" className="text-white hover:underline">Forget password ?</a>
            </div>
          </form>

          <div className="relative flex items-center justify-center my-6">
            <div className="w-full border-t border-gray-700"></div>
            <span className="absolute bg-transparent px-4 text-gray-400">Or</span>
          </div>

          <div className="flex justify-center mt-0 space-x-4">
            <button
              onClick={(e) => handleSocial(e,new GoogleAuthProvider())}
              disabled={loading}
              className={`bg-transparent rounded-full p-2 hover:bg-gray-200 transition-all ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <img src={Google} alt="Google" className="w-7 h-7" />
            </button>
            <button
              onClick={(e) => handleSocial(e,new FacebookAuthProvider())}
              disabled={loading}
              className={`bg-transparent rounded-full p-2 hover:bg-gray-200 transition-all ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <img src={Facebook} alt="Facebook" className="w-7 h-7" />
            </button>
            <button
              onClick={(e) => handleSocial(e,new GithubAuthProvider())}
              disabled={loading}
              className={`bg-transparent rounded-full p-2 hover:bg-gray-200 transition-all ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <img src={Github} alt="Github" className="w-7 h-7" />
            </button>
          </div>

          <div className="text-center text-sm mt-4">
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

export default Login;
