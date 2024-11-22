// src/redux/slices/AuthSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  browserPopupRedirectResolver,
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth';import { auth } from '../../firebaseConfig.ts';
import { getDoc, doc, updateDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebaseConfig.ts';

// Types
interface AuthState {
  user: {
    displayName(arg0: string, displayName: any, email: string | null): unknown;
    name: string | null;
    email: string | null;
    username: string | null;
  } | null;
  loading: boolean;
  error: string | null;
  rememberMe: boolean;
  isloggedin: boolean;
}


const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  rememberMe: false, 
  isloggedin: localStorage.getItem("isloggedin") === "false"
};

// Handle authentication errors
const handleAuthErrorlogin = (error: any) => {
  console.error('Auth error:', error);
  switch (error.code) {
    case 'auth/user-not-found':
      return 'No account found with this email.';
    case 'auth/wrong-password':
      return 'Incorrect password.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later.';
    default:
      return error.message || 'Login failed. Please try again.';
  }
};

// Async Thunk to handle email login
export const handleEmailLogin = createAsyncThunk(
  'auth/login',
  async ({ email, password, rememberMe }: { email: string; password: string; rememberMe: boolean }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Save user data for Redux
      const user = {
        name: userCredential.user.displayName || 'User', // Default if displayName is null
        email: userCredential.user.email || '',
        
      };
      console.log(userCredential);
      // Store rememberMe setting in localStorage
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      }

      // Return the user data for the fulfilled state
      return { user };
    } catch (error: any) {
      const errorMessage = handleAuthErrorlogin(error); // Handle and return the error message
      return rejectWithValue(errorMessage);
    }
  }
);


// Async Thunk to handle social login
export const handleSocialLogin = createAsyncThunk(
  'auth/loginSocial',
  async (provider: GoogleAuthProvider | FacebookAuthProvider | GithubAuthProvider, { rejectWithValue }) => {
    try {
      // Sign in with the chosen social provider (Google, Facebook, etc.)
      const result = await signInWithPopup(auth, provider,browserPopupRedirectResolver);
      if (result.user) {
        const userDoc = await getDoc(doc(db, 'users', result.user.uid));
        console.log(userDoc);
        
        if (!userDoc.exists()) {
          await updateDoc(doc(db, 'users', result.user.uid), {
            lastLogin: new Date(),
            loginMethod: provider.providerId
          });
        }

        
      }

      // Get user data from result 
      const user = {
        name: result.user.displayName || 'User',
        email: result.user.email || '',
        username:result.user.username ||'',
        uid: result.user.uid||''
        
      };
      console.log(user);
     
    

      // Return user data
      return {user};
    } catch (error: any) {
      const errorMessage = handleAuthErrorlogin(error); // Handle and return the error message
      return rejectWithValue(errorMessage);
    }
  }
);


















const handleAuthErrorsignup = (error: any) => {
  console.error('Auth error:', error);
  switch (error.code) {
    case 'auth/popup-blocked':
      return 'Popup was blocked. Please disable your popup blocker and try again.';
    case 'auth/popup-closed-by-user':
      return 'Authentication popup was closed. Please try again.';
    case 'auth/cancelled-popup-request':
      return 'Multiple popup requests were cancelled.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection and try again.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later.';
    case 'auth/email-already-in-use':
      return 'Email is already registered. Please login or use a different email.';
    default:
      return error.message || 'An error occurred during authentication. Please try again.';
  }
};

const saveUserData = async (userId: string, userData: any) => {
  try {
    await setDoc(doc(db, 'users', userId), {
      ...userData,
      createdAt: serverTimestamp(),
    }, { merge: true });
    return true;
  } catch (error) {
    console.error('Error saving user data:', error);
    return false;
  }
};

// Redux async thunk for handling email signup
export const handleEmailSignup = createAsyncThunk(
  'auth/signup',
  async (
    { username, email, password, rememberMe }: 
    { username: string; email: string; password: string; rememberMe: boolean },
    { rejectWithValue }
  ) => {
    try {
      // Firebase email signup
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Define user data for Firestore
      const user = {
        uid: userCredential.user.uid,
        username: username || "",
        name: userCredential.user.displayName || 'User',
        email: userCredential.user.email || '',
      };
      console.log(user)
      
      // Save user data to Firestore
      const isUserDataSaved = await saveUserData(userCredential.user.uid, user);
      if (!isUserDataSaved) {
        return rejectWithValue('Failed to save user data. Please try again.');
      }
      
      // Remember email if needed
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      }
      return {
       user
      };
    } 
    catch (error: any) {
      const errorMessage = handleAuthErrorsignup(error);
      console.error('Signup error:', errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);


export const handleSocialSignup = createAsyncThunk(
  'auth/socialSignup',
  async (
    provider: GoogleAuthProvider | FacebookAuthProvider | GithubAuthProvider,
    { rejectWithValue }
  ) => {
    try {
      // Sign in with popup using the specified provider
      const result = await signInWithPopup(auth, provider,browserPopupRedirectResolver);
      
      // Check if user data is available
      if (result.user) {
        const userData = {
          name: result.user.displayName || 'User',
          email: result.user.email || '',
          provider: provider.providerId ||'',
          username: result.user.username || '',
        };
        
        // Save user data to Firestore
        const isUserDataSaved = await saveUserData(result.user.uid, userData);
        if (!isUserDataSaved) {
          return rejectWithValue('Failed to save user data. Please try again.');
        }
        console.log(isUserDataSaved);

        return {
          uid: result.user.uid,
          name: userData.name,
          email: userData.email,
          username: userData.username,
        };
      }
    } catch (error: any) {
      // Handle the error with a user-friendly message
      const errorMessage = handleAuthErrorsignup(error);
      console.error('Social signup error:', errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);



export const handleLogout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await signOut(auth); // Firebase sign out
    
    localStorage.removeItem('data');
    
    return true; // Indicate successful logout
  } catch (error: any) {
    console.error('Logout error:', error);
    return rejectWithValue('Failed to logout. Please try again.');
  }
});
            





{/* <div className='text-gray-500 pb-7'>
F.R.I.D.A.Y Can make Mistakes. So Check important Info.
</div> */}






// Auth Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle Email Login
      .addCase(handleEmailLogin.pending, (state) => {
        state.isloggedin =false;
        state.loading = true;
        state.error = null;
      })
      .addCase(handleEmailLogin.fulfilled, (state, action: PayloadAction<{ user: { name: string; email: string }; emailVerified: boolean }>) => {
        state.loading = false;
        localStorage.setItem("isloggedin", JSON.stringify(true));
        state.isloggedin =true;
        localStorage.setItem("data", JSON.stringify(action.payload.user));
        state.user = action.payload.user;
      })
      .addCase(handleEmailLogin.rejected, (state, action) => {
        state.isloggedin =false;
        state.loading = false;
        state.error = action.payload as string; // Handle errors from rejected state
      })

      // Handle Social Login
      .addCase(handleSocialLogin.pending, (state) => {
        state.isloggedin =false
        state.loading = true;
        state.error = null;
      })
      .addCase(handleSocialLogin.fulfilled, (state, action: PayloadAction<{user:{ name: string; email: string;username:string;uid:string }}>) => {
        state.isloggedin =true;
        state.loading = false;
        console.log("hi");
        
        console.log('Payload Data:', action.payload.user);

        // Store the user in localStorage
        localStorage.setItem('isloggedin', JSON.stringify(true));
        localStorage.setItem('data', JSON.stringify(action.payload.user));
        state.user = action.payload;
      })
      .addCase(handleSocialLogin.rejected, (state, action) => {
        state.isloggedin =false;
        state.loading = false;
        
        state.error = action.payload as string; // Handle errors from rejected state
      })



      //Handle Signup by Email
      .addCase(handleEmailSignup.pending, (state) => {
        state.isloggedin =false;
        state.loading = true;
        state.error = null;
      })
      .addCase(handleEmailSignup.fulfilled, (state, action: PayloadAction<{ user:{uid: string;name:string; username: string; email: string }}>) => {
        state.isloggedin =true;
        state.loading = false;
        localStorage.setItem("isloggedin", JSON.stringify(true));
        localStorage.setItem("data", JSON.stringify(action.payload.user));
        state.user = action.payload;
      })
      .addCase(handleEmailSignup.rejected, (state, action: PayloadAction<string | null>) => {
        state.isloggedin =false;
        state.loading = false;
        state.error = action.payload || 'Signup failed';
      })

      //Signup by social
      .addCase(handleSocialSignup.pending, (state) => {
        state.isloggedin =false;
        state.loading = true;
        state.error = null; // Reset error state when starting a new signup
      }) 
      .addCase(handleSocialSignup.fulfilled, (state, action: PayloadAction<{user:{username: string; email: string ;name: string;uid: string}}>) => {
        state.isloggedin =true;
        state.loading = false;
        localStorage.setItem("isloggedin", JSON.stringify(true));
        localStorage.setItem("data", JSON.stringify(action.payload.user));
        state.user = action.payload; // Set user data on successful signup
      })
      .addCase(handleSocialSignup.rejected, (state, action: PayloadAction<string | null>) => {
        state.isloggedin =false;
        state.loading = false;
        state.error = action.payload || 'Social signup failed. Please try again.'; // Set error message if signup fails
      })

      .addCase(handleLogout.pending, (state) => {
        state.loading = true; // Set loading state during logout
        state.error = null; // Clear any previous errors
      })
      .addCase(handleLogout.fulfilled, (state) => {
        state.user = null; // Reset user data
        localStorage.setItem("isloggedin", JSON.stringify(false));
        state.isloggedin = false; // Mark user as logged out
        state.loading = false; // Reset loading state
      })
      .addCase(handleLogout.rejected, (state, action: PayloadAction<string | null>) => {
        state.loading = true; // Stop loading
        state.error = action.payload || 'Logout failed. Please try again.'; // Set error message
      });
      
  },
});

export default authSlice.reducer;
































// import React, { useState, useEffect, useRef } from 'react';
// import SendIcon from '../../assets/send-icon.svg';
// import Media from '../../assets/media.svg';

// import AnswerIcon from '../../assets/AnswerIcon.svg';
// import { useSelector } from 'react-redux';
// import { RootState } from '@reduxjs/toolkit/query';
// import { Circularnav } from '../../Components/Circularnav/Circularnav';

// // Dummy JSON data
// const dummyData = [
//   { question: "What's the Tesla share price today?", answer: "Tesla's share price is $169.84, down by -8.05 (4.53%)" },
//   { question: "What's the weather today?", answer: "The weather today is sunny with a high of 75°F." },
//   { question: "Suggest a movie.", answer: "I suggest watching 'Inception'." },
//   { question: "Play a song.", answer: "Playing 'Shape of You' by Ed Sheeran." },
// ];

// export const Prompt: React.FC = () => {

//   const [input, setInput] = useState('');
//   const [chat, setChat] = useState<{ question: string; answer: string }[]>([]);
//   const [hasSearched, setHasSearched] = useState(false);
//   const chatContainerRef = useRef<HTMLDivElement>(null);

//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [uploading, setUploading] = useState(false);
//   const { user, loading, error, rememberMe } = useSelector((state: RootState) => state.auth);


//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setUploading(true);
//       setUploadProgress(0);

//       // Simulate upload progress
//       const uploadInterval = setInterval(() => {
//         setUploadProgress(prev => {
//           if (prev >= 100) {
//             clearInterval(uploadInterval);
//             setUploading(false);
//             return 100;
//           }
//           return prev + 10;
//         });
//       }, 300); // Adjust interval duration for upload speed simulation
//     }
//   };







//   const handleRequest = () => {
//     if (input.trim() === '') return;

//     if (!hasSearched) {
//       setHasSearched(true);
//       setChat([{ question: "", answer: "Hi! How can I help you today?" }]);
//     }

//     const response = dummyData.find(
//       (item) => item.question.toLowerCase() === input.toLowerCase()
//     );

//     const newChat = response
//       ? { question: input, answer: response.answer }
//       : { question: input, answer: "I'm not sure about that." };

//     setChat((prevChat) => [...prevChat, newChat]);
//     setInput('');
//   };

//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//     }
//   }, [chat]);

//   return (
//     <div className="bg-black text-center relative text-white">
//       {/* Plus icon with expanded menu */}

//      <Circularnav/>

//       <div className="flex flex-col justify-center items-center pb-80 lg:pt-[10%] md:pt-[15%] pt-[20%]">
//         {!hasSearched ? (
//           <>
//             <h2 className="lg:text-4xl md:text-3xl text-2xl font-sans bg-gradient-to-r from-blue-400 to-pink-400 inline-block bg-clip-text text-transparent">
//               Hello, {user?.name || "Guest"}
//             </h2>
//             <p className="text-gray-400 lg:text-xl md:text-lg text-sm">What Can I Help With?</p>

//             <div className="relative w-full lg:max-w-3xl md:max-w-xl max-w-lg mx-auto px-4 mt-4">
//               <input
//                 type="text"
//                 placeholder="Ask F.R.I.D.A.Y"
//                 className="w-full p-2 pr-12 pl-10 rounded-lg text-white placeholder-slate-800 text-center focus:outline-none bg-transparent border border-gray-800"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//               />
//               <img
//                 src={SendIcon}
//                 alt="SendIcon"
//                 className="absolute inset-y-1 right-5 p-0 w-8 h-8 cursor-pointer"
//                 onClick={handleRequest}
//               />
//              <label htmlFor="file-upload" className="absolute inset-y-3 left-5 p-0 w-4 h-5 cursor-pointer">
//              <img src={Media} alt="Media" className="absolute inset-y-0 left-2 p-0 w-4 h-5 cursor-pointer" />
//               </label>
//               <input
//             id="file-upload"
//             type="file"
//             onChange={handleFileChange}
//             className="hidden"
//           />
//           {uploading && (
//             <div className="absolute inset-x-0 top-12 w-full bg-gray-700 rounded-lg overflow-hidden">
//               <div
//                 style={{ width: `${uploadProgress}%` }}
//                 className="bg-blue-500 h-1 transition-all duration-200"
//               ></div>
//             </div>
//           )}
//             </div>

//             <div className="mt-5 pb-20 space-x-3 flex justify-center">
//               <button
//                 className="text-white bg-transparent border border-orange-400 py-1 px-2 rounded-lg hover:bg-gray-700 text-sm"
//                 onClick={() => setInput("Suggest a movie.")}
//               >
//                 Suggest a movie.
//               </button>
//               <button
//                 className="text-white bg-transparent border border-green-700 py-1 px-2 rounded-lg hover:bg-gray-700 text-sm"
//                 onClick={() => setInput("What's the weather today?")}
//               >
//                 What's the weather today?
//               </button>
//               <button
//                 className="text-white bg-transparent border border-red-600 py-1 px-2 rounded-lg hover:bg-gray-700 text-sm"
//                 onClick={() => setInput("Play a song.")}
//               >
//                 Play a song.
//               </button>
//             </div>
//           </>
//         ) : (
          
//           <div className="flex flex-col w-full max-h-full max-w-xl mx-auto mt-0 p-0 space-y-4 bg-black" ref={chatContainerRef}>
//             {chat.map((msg, index) => (
//               <div key={index} className="flex flex-col">
//                 <div className="text-white font-mono font-normal p-0 rounded-lg max-w-xs self-end ml-0 mr-0 xl:translate-y-[-150px] lg:translate-y-[-10px] md:translate-y-[-60px]">
//                   <p>{msg.question}</p>
//                 </div>
//                 {msg.answer && (
//                   <div className=" text-white font-mono font-normal p-3 rounded-lg max-w-xs self-start mt-0 xl:translate-y-[-150px] lg:translate-y-[-100px] md:translate-y-[-60px]">
//                     <div className='flex'>
//                       <img src={AnswerIcon} alt="AnswerIcon" className="w-6 h-6 mr-4" />
//                       <p>{msg.answer}</p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}



  

//         {hasSearched && (
//           <div className="fixed bottom-10 left-0 right-0 mx-auto w-full lg:max-w-3xl md:max-w-xl max-w-lg px-4">
//             <div className="relative w-full lg:max-w-3xl md:max-w-xl max-w-lg mx-auto px-4 mt-4">
//               <input
//                 type="text"
//                 placeholder="Ask F.R.I.D.A.Y"
//                 className="w-full p-2 pr-12 pl-10 rounded-lg text-white placeholder-slate-800 text-center focus:outline-none bg-black border border-gray-800"
//                 value={input} 
//                 onChange={(e) => setInput(e.target.value)}
//               />


//               <img
//                 src={SendIcon}
//                 alt="SendIcon"
//                 className="absolute inset-y-1 right-5 p-0 w-8 h-8 cursor-pointer"
//                 onClick={handleRequest}
//               />

                
                  
//             <label htmlFor="file-upload" className="absolute inset-y-3 left-5 p-0 w-4 h-5 cursor-pointer">
//               <img src={Media} alt="Media" className="absolute inset-y-0 left-2 p-0 w-4 h-5 cursor-pointer" />
//             </label>
//             <input
//             id="file-upload"
//             type="file"
//             onChange={handleFileChange}
//             className="hidden"
//           />
//           {uploading && (
//             <div className="absolute inset-x-0 top-12 w-full bg-gray-700 rounded-lg overflow-hidden translate-y-48">
//               <div
//                 style={{ width: `${uploadProgress}%` }}
//                 className="bg-blue-500 h-1 transition-all duration-200"
//               ></div>
//             </div>
//           )}   


//             </div>
//           </div>
//         )}
//       </div>

  
//     </div>
//   );
// };