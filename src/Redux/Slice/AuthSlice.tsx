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
  createUserWithEmailAndPassword
} from 'firebase/auth';import { auth } from '../../firebaseConfig.ts';
import { getDoc, doc, updateDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebaseConfig.ts';

// Types
interface AuthState {
  user: {
    username(arg0: string, displayName: string | null, email: string | null, username: any): unknown; displayName: string | null; email: string | null 
} | null;
  loading: boolean;
  error: string | null;
  rememberMe: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  rememberMe: false, // Add rememberMe to store
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
        displayName: userCredential.user.displayName || 'User', // Default if displayName is null
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
      return user;
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
        username: userCredential.user.username || "",
        displayName: userCredential.user.displayName || 'User',
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













// Auth Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle Email Login
      .addCase(handleEmailLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleEmailLogin.fulfilled, (state, action: PayloadAction<{ user: { displayName: string; email: string }; emailVerified: boolean }>) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(handleEmailLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Handle errors from rejected state
      })

      // Handle Social Login
      .addCase(handleSocialLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleSocialLogin.fulfilled, (state, action: PayloadAction<{ name: string; email: string;username:string;uid:string }>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(handleSocialLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Handle errors from rejected state
      })



      //Handle Signup by Email
      .addCase(handleEmailSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleEmailSignup.fulfilled, (state, action: PayloadAction<{ uid: string;name:string; username: string; email: string }>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(handleEmailSignup.rejected, (state, action: PayloadAction<string | null>) => {
        state.loading = false;
        state.error = action.payload || 'Signup failed';
      })

      //Signup by social
      .addCase(handleSocialSignup.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error state when starting a new signup
      })
      .addCase(handleSocialSignup.fulfilled, (state, action: PayloadAction<{username: string; email: string ;name: string;uid: string}>) => {
        state.loading = false;
        state.user = action.payload; // Set user data on successful signup
      })
      .addCase(handleSocialSignup.rejected, (state, action: PayloadAction<string | null>) => {
        state.loading = false;
        state.error = action.payload || 'Social signup failed. Please try again.'; // Set error message if signup fails
      });

  },
});

export default authSlice.reducer;
