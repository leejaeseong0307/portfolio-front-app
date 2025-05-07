import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'; // 나중에 만들 파일

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});