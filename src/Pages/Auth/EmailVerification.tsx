import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, sendEmailVerification, onAuthStateChanged } from 'firebase/auth';
import backgroundImage from '@/assets/ForgetPassword_Bg.svg';
import Logo from "@/assets/Logo.svg";

const EmailVerification: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const auth = getAuth();

  // Set up countdown timer for resend button
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0 && !canResend) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [countdown, canResend]);

  // Check user verification status
  useEffect(() => {
    const checkEmailVerification = async (user: any) => {
      if (user && !user.emailVerified) {
        // Send verification email if user isn't verified
        await sendEmailVerification(user);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Check verification status every 5 seconds
        const intervalId = setInterval(async () => {
          await user.reload();
          if (user.emailVerified) {
            clearInterval(intervalId); // Stop checking if verified
            navigate('/home'); // Redirect to home page
          }
        }, 5000);

        // Immediately send verification email if it's the first time
        checkEmailVerification(user);
      } else {
        navigate('/login'); // Redirect to login if no user
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  // Handle resend button click
  const handleResendVerification = async () => {
    if (!canResend) return;

    setError('');
    setLoading(true);

    try {
      const user = auth.currentUser;
      if (user) {
        await sendEmailVerification(user);
        setCountdown(60);
        setCanResend(false);
      } else {
        throw new Error('No user found');
      }
    } catch (error: any) {
      setError('Failed to resend verification email. Please try again.');
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

      <div className="flex justify-center items-center h-[calc(100vh-200px)]">
        <div className="text-white border border-white bg-transparent backdrop-filter backdrop-blur-md p-10 rounded-2xl shadow-lg max-w-md w-full">
          <h2 className="text-3xl font-sans font-semibold mb-4">Verify Your Email</h2>
          
          {error && (
            <div className="bg-red-500 bg-opacity-20 border border-red-500 text-white p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <p className="mb-6">
            We've sent a verification email to your inbox. Please click the link in the email to verify your account.
          </p>

          <button
            onClick={handleResendVerification}
            disabled={!canResend || loading}
            className={`w-full bg-gradient-to-r from-[#2E4DEF] to-[#0E148E] text-white py-2 rounded-lg mb-4 ${
              (!canResend || loading) ? 'opacity-50 cursor-not-allowed' : 'hover:from-[#2541D1] hover:to-[#0B1070]'
            }`}
          >
            {loading ? 'Sending...' : canResend ? 'Resend Verification Email' : `Resend available in ${countdown}s`}
          </button>

          <div className="text-center mt-6">
            <button
              onClick={() => navigate('/login')}
              className="text-white hover:underline"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
