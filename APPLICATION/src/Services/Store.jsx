import { combineReducers, configureStore } from "@reduxjs/toolkit";

// API's
import { auth } from "./API/Auth";

// SLICES
import authSlice from "./Slices/Auth";

const rootReducer = combineReducers({
  [auth.reducerPath]: auth.reducer,
  authSlice,
});

export const Store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(auth.middleware),
});
