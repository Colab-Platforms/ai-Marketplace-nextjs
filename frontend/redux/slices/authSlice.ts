import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import apiClient from '@/lib/api';
import type { AuthState, AuthUser, LoginPayload, RegisterPayload } from '@/type/auth';

const getInitialAuthState = (): AuthState => {
  if (typeof window === 'undefined') {
    return {
      user: null,
      accessToken: null,
      loading: false,
      error: null,
    };
  }

  const storedToken = localStorage.getItem('accessToken');
  const storedUser = localStorage.getItem('authUser');

  return {
    user: storedUser ? (JSON.parse(storedUser) as AuthUser) : null,
    accessToken: storedToken,
    loading: false,
    error: null,
  };
};

// Async Thunk for Login
export const loginUser = createAsyncThunk<
  { user: AuthUser; accessToken: string },
  LoginPayload,
  { rejectValue: string }
>('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await apiClient.post('/api/auth/login', credentials);
    const payload = response.data?.data;

    if (!payload?.token || !payload?.user) {
      return rejectWithValue('Invalid server response.');
    }

    const authUser: AuthUser = payload.user;
    const accessToken = payload.token as string;

    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('authUser', JSON.stringify(authUser));
    }

    return {
      user: authUser,
      accessToken,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message || 'Unable to sign in. Please try again.';
      return rejectWithValue(message);
    }
    return rejectWithValue('Unable to sign in. Please try again.');
  }
});

// Async Thunk for Registration
export const registerUser = createAsyncThunk<
  { message: string },
  RegisterPayload,
  { rejectValue: string }
>('auth/register', async (payload, { rejectWithValue }) => {
  try {
    const response = await apiClient.post('/api/auth/register', payload);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Registration failed. Please try again.';
      return rejectWithValue(message);
    }
    return rejectWithValue('Something went wrong. Please try again.');
  }
});

// Async Thunk for Logout
export const logout = createAsyncThunk('auth/logout', async () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('authUser');
  }
});

const initialState: AuthState = getInitialAuthState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ user: AuthUser; accessToken: string }>) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.error = null;
      state.loading = false;
    },
    clearAuth(state) {
      state.user = null;
      state.accessToken = null;
      state.error = null;
      state.loading = false;
    },
    clearAuthError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login flows
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error.message ?? 'Unable to sign in.';
      })
      // Register flows
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Registration failed.';
      })
      // Logout flow
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.error = null;
        state.loading = false;
      });
  },
});

export const { setUser, clearAuth, clearAuthError } = authSlice.actions;
export default authSlice.reducer;