import { configureStore } from '@reduxjs/toolkit';
import filterReduce from './slices/filterSlice';

export const store = configureStore({
  reducer: {
    filterReduce,
  },
});
