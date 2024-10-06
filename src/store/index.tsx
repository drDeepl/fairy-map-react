import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import authReducer from "../features/auth/authSlice";

const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;

export default store;
