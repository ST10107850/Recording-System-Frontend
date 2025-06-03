import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authApiSlice";
import { apiSlice } from "../features/auth/apiSlice";
export const store = configureStore({
  devTools: true,
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
