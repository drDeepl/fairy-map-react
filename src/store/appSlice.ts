import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface JwtPayload {
  sub: number;
  iat: number;
  exp: number;
}

type CurrentUser = JwtPayload | undefined | null;

interface AppState {
  isLoad: boolean;
  currentUser: CurrentUser;
}

const initialState: AppState = {
  isLoad: true,
  currentUser: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoading(state: AppState, action: PayloadAction<boolean>) {
      state.isLoad = action.payload;
    },
    setCurrentUser(state: AppState, action: PayloadAction<CurrentUser>) {
      state.currentUser = action.payload;
    },
  },
});

export const { setLoading, setCurrentUser } = appSlice.actions;

export default appSlice.reducer;
