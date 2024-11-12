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
  browserPopupRedirectResolver
} from 'firebase/auth';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const saveUserData = async (userId: string, userData: any) => {
    try {
      await setDoc(doc(db, 'users', userId), {
        ...userData,
        createdAt: serverTimestamp()
      }, { merge: true });
      return true;
    } catch (error) {
      console.error('Error saving user data:', error);
      return false;
    }
  };

  const handleAuthError = (error: any) => {
    console.error('Auth error:', error);
    switch (error.code) {
      case 'auth/popup-blocked':
        setError('Popup was blocked. Please disable your popup blocker and try again.');
        break;
      case 'auth/popup-closed-by-user':
        setError('Authentication popup was closed. Please try again.');
        break;
      case 'auth/cancelled-popup-request':
        setError('Multiple popup requests were cancelled.');
        break;
      case 'auth/network-request-failed':
        setError('Network error. Please check your connection and try again.');
        break;
      case 'auth/too-many-requests':
        setError('Too many attempts. Please try again later.');
        break;
      case 'auth/email-already-in-use':
        setError('Email is already registered. Please login or use a different email.');
        break;
      default:
        setError(error.message || 'An error occurred during authentication. Please try again.');
    }
  };

  // Email/Password Signup
  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      if (userCredential.user) {
        const userData = {
          username: formData.username,
          email: formData.email,
        };

        const savedData = await saveUserData(userCredential.user.uid, userData);
        if (savedData) {
          navigate('/verification');
        } else {
          setError('Failed to save user data. Please try again.');
        }
      }
    } catch (error: any) {
      handleAuthError(error);
    } finally {
      setLoading(false);
    }
  };

  // Generic social sign-in handler
  const handleSocialSignIn = async (provider: GoogleAuthProvider | FacebookAuthProvider | GithubAuthProvider) => {
    setError('');
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, provider, browserPopupRedirectResolver);
      
      if (result.user) {
        const userData = {
          username: result.user.displayName,
          email: result.user.email,
          provider: provider.providerId
        };

        const savedData = await saveUserData(result.user.uid, userData);
        if (savedData) {
          navigate('/');
        } else {
          setError('Failed to save user data. Please try again.');
        }
      }
    } catch (error: any) {
      handleAuthError(error);
    } finally {
      setLoading(false);
    }
  };

  // Provider-specific handlers
  const handleGoogleSignin = () => handleSocialSignIn(new GoogleAuthProvider());
  const handleFacebookSignin = () => handleSocialSignIn(new FacebookAuthProvider());
  const handleGithubSignin = () => handleSocialSignIn(new GithubAuthProvider());

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

          <form onSubmit={handleEmailSignup}>
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
