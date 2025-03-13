import { configureStore } from '@reduxjs/toolkit';
import { todoReducer } from './todoSlice';

const todoStore = configureStore({
    reducer: todoReducer
});

export default todoStore;