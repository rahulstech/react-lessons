import { configureStore } from '@reduxjs/toolkit';
import { postReducer } from '../features/posts/postSlice';

export const appStore = configureStore({
    reducer: {
        posts: postReducer,
    }
});