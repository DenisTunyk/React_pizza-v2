import { configureStore } from '@reduxjs/toolkit';
import filterReduce from './slices/filterSlice';
import cartReduce from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    filterReduce,
    cartReduce,
  },
});
