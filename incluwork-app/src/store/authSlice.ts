
import { createSlice, createAsyncThunk, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import authService from '../services/authService';
import { User, LoginCredentials } from '../models/User';
import jobSeekerService from '../services/jobSeekerService';

interface AuthState {
  user: User | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  isLoadingSignup: boolean;//Seperate loading state for signup
  message: string;
}

const initialState: AuthState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isLoadingSignup: false, 
  message: '',
};

export const login = createAsyncThunk(
  '/login',
  async (credentials: LoginCredentials, thunkAPI) => {
    try {
      const response = await authService.login(credentials);
      const {  token } = response;  // Assuming the token comes with the response
      localStorage.setItem('token', token); // Store the token in localStorage
      localStorage.setItem('type', response.type); // Store the token in localStorage

      // Additional step: If the user is a jobseeker, fetch additional data
      if (response.type === 'jobseeker') {
        const jobSeekerData = await jobSeekerService.getJobSeekerData(response.id, response.token);
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

export const signup = createAsyncThunk(
  '/signup',
  async (formData: any, thunkAPI) => {
    try {
      const response = await authService.signup(formData);
      

      const {  token } = response;  // Assuming the token comes with the response
      localStorage.setItem('token', token); // Store the token in localStorage
      localStorage.setItem('type', response.type); // Store the token in localStorage

      if (response.type === 'jobseeker') {
        const jobSeekerData = await jobSeekerService.getJobSeekerData(response.id, response.token);
        return { id: response.id, type: response.type, ...jobSeekerData };
      }

      return { id: response.id, type: response.type };

    } catch (error: any) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.isLoadingSignup = false; 
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
      .addCase(login.rejected, (state, action: PayloadAction<SerializedError>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message || 'Failed to login';
        state.user = null;
      })
      //Signup reducers
      .addCase(signup.pending, (state) => {
        state.isLoadingSignup = true;
      })
      .addCase(signup.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoadingSignup = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action: PayloadAction<SerializedError>) => {
        state.isLoadingSignup = false;
        state.isError = true;
        state.message = action.payload.message || 'Failed to register';
      })
      ;
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
