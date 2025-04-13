import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import storeReducer from './slices/storeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    store: storeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;