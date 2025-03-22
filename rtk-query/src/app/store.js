import { configureStore } from '@reduxjs/toolkit'
import postApi from '../features/post/postSlice'
import userApi from '../features/user/userSlice';

const appStore = configureStore({
    reducer: {
        [postApi.reducerPath]: postApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(userApi.middleware)
    .concat(postApi.middleware),
})

export default appStore;