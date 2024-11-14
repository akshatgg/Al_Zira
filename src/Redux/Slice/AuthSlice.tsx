// src/redux/slices/AuthSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  browserPopupRedirectResolver
} from 'firebase/auth';import { auth } from '../../firebaseConfig.ts';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig.ts';

// Types
interface AuthState {
  user: { displayName: string | null; email: string | null } | null;
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
const handleAuthError = (error: any) => {
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
      const errorMessage = handleAuthError(error); // Handle and return the error message
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
        displayName: result.user.displayName || 'User',
        email: result.user.email || '',
      };
      console.log(user);
      
      
    

      // Return user data
      return user;
    } catch (error: any) {
      const errorMessage = handleAuthError(error); // Handle and return the error message
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
      .addCase(handleSocialLogin.fulfilled, (state, action: PayloadAction<{ displayName: string; email: string }>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(handleSocialLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Handle errors from rejected state
      });
  },
});

export default authSlice.reducer;
