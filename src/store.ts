import { configureStore } from "@reduxjs/toolkit";
import { api } from "./slices/ApiSlice";
import authReducer from "./slices/AuthSlice"
export const store = configureStore({

  reducer: {
    auth:authReducer, 
    [api.reducerPath]: api.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  devTools: true,
});
