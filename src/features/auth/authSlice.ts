import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export interface JwtPayload {
  sub: string;
  email: string;
}

export interface AuthState {
  loading: boolean;
  error: string | null;
  success: boolean;
  user: null | JwtPayload;
}

const initialState: AuthState = {
  loading: false,
  error: null,
  success: false,
  user: null,
};

interface SignInPayload {
  email: string;
  password: string;
}

export const signIn = createAsyncThunk(
  "user/signin",
  async (signInData: SignInPayload, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:300/api/v1/auth/signin",
        signInData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        (error as AxiosError).response?.data || "unknown error"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(signIn.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
