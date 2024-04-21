import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import authService from '../services/authService';
import jobSeekerService from '../services/jobSeekerService';
import { User, LoginCredentials } from '../models/User';

interface AuthState {
  user: User | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: AuthState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Asynchronous thunk action for login
export const login = createAsyncThunk(
    'auth/login',
    async (credentials: LoginCredentials, thunkAPI) => {
      try {
        const response = await authService.login(credentials);
        const { token } = response;  // Assuming the token comes with the response
        localStorage.setItem('token', token); // Store the token in localStorage
        localStorage.setItem('type', response.type); // Store the user type in localStorage

        // Additional step: If the user is a jobseeker, fetch additional data
        if (response.type === 'jobseeker') {
          const jobSeekerData = await jobSeekerService.getJobSeekerData(response.id, token);
          return { id: response.id, type: response.type, ...jobSeekerData };
        }

        return { id: response.id, type: response.type };
      } catch (error: any) {
        return thunkAPI.rejectWithValue({
          message: error.message || 'Unable to log in',
          ...error.response?.data
        });
      }
    }
);

// Asynchronous thunk action for logout
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    // Clear local storage or any other persistent storage used
    localStorage.removeItem('token');
    localStorage.removeItem('type');
    // Optional: Add an API call here if you need to notify the backend about the logout
    return {};
  } catch (error) {
    return thunkAPI.rejectWithValue({ message: 'Failed to log out' });
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(login.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = action.payload;
        })
        .addCase(login.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.error.message || 'Failed to login';
          state.user = null;
        })
        .addCase(logout.fulfilled, (state) => {
          // Reset the state to initial state on successful logout
          state.isLoading = false;
          state.isSuccess = false;
          state.isError = false;
          state.message = '';
          state.user = null;
        })
        .addCase(logout.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.error.message || 'Logout failed';
        });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
