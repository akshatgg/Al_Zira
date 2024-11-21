import React, { useState } from 'react';
import backgroundImage from '@/assets/Signup_Bg.svg';
import Logo from "@/assets/Logo.svg";
import Google from "@/assets/Google.svg";
import Github from "@/assets/Github.svg";
import Facebook from "@/assets/Facebook.svg";
import { useNavigate } from 'react-router-dom';
import firebaseConfig from '../../firebaseConfig';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
} from 'firebase/auth';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { handleEmailSignup, handleSocialSignup } from '../../Redux/Slice/AuthSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Redux/store'; // Ensure this path is correct

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const { user, loading, error, rememberMe } = useSelector((state: RootState) => state.auth);
  const [rememberMeState, setRememberMeState] = useState(rememberMe);

  // Function to handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Function to handle email-based signup
  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await dispatch(
        handleEmailSignup({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          rememberMe: rememberMeState
        })
      );

      if (handleEmailSignup.fulfilled.match(userCredential)) {
        navigate('/');
      } else {
        console.error('Signup failed:', userCredential.payload);
      }
    } catch (e: any) {
      console.error('Error during signup:', e.message);
    }
  };

  // Generic social sign-in handler
  const handleSocialSignIn = async (provider: GoogleAuthProvider | FacebookAuthProvider | GithubAuthProvider) => {
    try {
      const result = await dispatch(handleSocialSignup(provider));
      console.log(result);
      // console.log(result.user);
      
      
      if (handleSocialSignup.fulfilled.match(result)) {
        navigate('/');
      } else {
        console.error('Social signup failed:', result.payload);
      }
    } catch (error: any) {
      console.error('Error:', error.message);
    }
  };

  // Provider-specific handlers
  const handleGoogleSignin = (e: React.FormEvent) => handleSocialSignIn(new GoogleAuthProvider());
  const handleFacebookSignin = (e: React.FormEvent) => handleSocialSignIn(new FacebookAuthProvider());
  const handleGithubSignin = (e: React.FormEvent) => handleSocialSignIn(new GithubAuthProvider());


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

      <div className="flex-none w-1/4 text-white border border-white bg-transparent backdrop-filter backdrop-blur-md p-10 rounded-2xl shadow-lg mb-20 mr-20">
        <h2 className="text-3xl font-sans font-semibold mb-0 mt-4">Signup</h2>
        <p className="mb-2">Just some details to get you in!</p>

        {error && (
      <div className="bg-red-500 bg-opacity-20 border border-red-500 text-white p-3 rounded-lg mb-4">
        <p className="text-sm">{error}</p>
        {error.includes('blocker') && (
          <p className="text-xs mt-1">
            Note: Some ad blockers may interfere with authentication. 
            Try disabling your ad blocker or using a different browser.
          </p>
        )}
      </div>
    )}

        <form onSubmit={handleEmail}>
          <div className="mb-4">
            <input
              className="border border-white bg-transparent w-full px-4 py-2 text-white rounded-lg focus:outline-none"
              id="username"
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <input
              className="border border-white bg-transparent w-full px-4 py-2 text-white rounded-lg focus:outline-none"
              id="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <input
              className="border border-white bg-transparent w-full px-4 py-2 text-white rounded-lg focus:outline-none"
              id="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <input
              className="border border-white bg-transparent w-full px-4 py-2 text-white rounded-lg focus:outline-none"
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="text-center">
        <button 
          type="submit"
          disabled={loading}
          className={`mb-2 bg-gradient-to-r from-[#2E4DEF] to-[#0E148E] rounded-lg text-white py-[2%] w-full cursor-pointer text-lg font-light ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Signing up...' : 'Signup'}
        </button>
      </div>
    </form>

        <div className="relative flex items-center justify-center my-6">
          <div className="w-full border-t border-gray-700"></div>
          <span className="absolute bg-transparent px-4 text-gray-400">Or</span>
        </div>

        <div className='flex justify-center'>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={handleGoogleSignin}
              disabled={loading}
              className={`bg-transparent rounded-full p-2 hover:bg-gray-200 transition-all ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <img src={Google} alt="Google" className="w-7 h-7" />
            </button>
            <button 
              onClick={handleFacebookSignin}
              disabled={loading}
              className={`bg-transparent rounded-full p-2 hover:bg-gray-200 transition-all ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <img src={Facebook} alt="Facebook" className="w-7 h-7" />
            </button>
            <button 
              onClick={handleGithubSignin}
              disabled={loading}
              className={`bg-transparent rounded-full p-2 hover:bg-gray-200 transition-all ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <img src={Github} alt="Github" className="w-7 h-7" />
            </button>
          </div>
        </div>

        <div className="text-center text-sm mt-4">
          Already Registered ? <a href="/login" className="text-white">Login</a>
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
Signup.displayName = 'Signup';
export default Signup;





































function dispatch(arg0: AsyncThunkAction<{ uid: string; username: string; email: string; }, { username: string; email: string; password: string; rememberMe: boolean; }, { state?: unknown; dispatch?: ThunkDispatch<unknown, unknown, UnknownAction>; extra?: unknown; rejectValue?: unknown; serializedErrorType?: unknown; pendingMeta?: unknown; fulfilledMeta?: unknown; rejectedMeta?: unknown; }>) {
  throw new Error('Function not implemented.');
}

