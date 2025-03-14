import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchPosts = createAsyncThunk('posts/fetchPosts', async (thunkApi) => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    if (res) {
        const { status, data } = res;
        if (status !== 200) {
            throw new Error(`fetchPosts failed with status ${status}`)
        }
        return data;
    }
    throw new Error(`no posts fetched`);
});


const postSlice = createSlice({
    name: 'PostSlice',
    initialState: {
        posts: [],
        status: 'idle',
        error: null
    },
    extraReducers(builder) {
        builder
        .addCase(fetchPosts.pending, (state,action) => {
            state.status = 'pending';
        })
        .addCase(fetchPosts.fulfilled, (state,action) => {
            state.status = 'idle';
            state.posts = action.payload;
        })
        .addCase(fetchPosts.rejected, (state,action) => {
            state.status = 'failed';
            state.error = action.error;
        })
    }
});

export {
    fetchPosts,
    postSlice,
};

export const postReducer = postSlice.reducer;