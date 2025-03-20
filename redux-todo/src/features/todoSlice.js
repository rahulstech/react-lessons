import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchAllTodos = createAsyncThunk('todo/fetchAllTodos', async () => {
    // return new Promise(async (resolve, reject) => {
    //     try {
    //         const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos',{
    //             params: { userId: 1 },
    //         });
    //         setTimeout(() => resolve(data), 2000);
    //     }
    //     catch(error) {
    //         reject(error);
    //     }
    // })
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos',{
        params: { userId: 1 },
    });
    return data;
})

export const createTodo = createAsyncThunk('todo/createTodo', async ({ title }) => {
    const { data } = await axios.post('https://jsonplaceholder.typicode.com/todos',{
        title,
        userId: 1,
    });
    return data;
})

export const updateTodo = createAsyncThunk('todo/updateTodo', async ({ id, values }) => {
    const { data } = await axios.patch(`https://jsonplaceholder.typicode.com/todos/${id}`,values);
    return data;
})

export const deleteTodo = createAsyncThunk('todo/deleteTodo', async (id) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    return id;
})

const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todos: [],
        loading: false,
        errors: null,
    },
    extraReducers(builder) {
        builder
        
        // fetchAllTodos

        .addCase(fetchAllTodos.pending, (state, action) => {
            state.loading = true;
            state.errors = null;
        })
        .addCase(fetchAllTodos.fulfilled, (state, action) => {
            state.loading = false;
            state.todos = action.payload,
            state.errors = null;
        })
        .addCase(fetchAllTodos.rejected, (state, action) => {
            state.loading = false;
            state.todos = []
            state.errors = action?.error?.message;
        })

        // createTodo

        .addCase(createTodo.pending, (state, action) => {
            state.loading = true;
            state.errors = null;
        })
        .addCase(createTodo.fulfilled, (state, action) => {
            state.loading = false;
            state.errors = null;
            state.todos.push(action.payload);
        })
        .addCase(createTodo.rejected, (state, action) => {
            state.loading = false;
            state.errors = action?.error?.message;
        })

        // updateTodo 

        .addCase(updateTodo.pending, (state, action) => {
            state.loading = true;
            state.errors = null;
        })
        .addCase(updateTodo.fulfilled, (state, action) => {
            const updatedTodo = action.payload;
            state.loading = false;
            state.errors = null;
            state.todos = state.todos.map( todo => {
                if (todo.id === updatedTodo.id) {
                    return updatedTodo;
                }
                return todo;
            });
        })
        .addCase(updateTodo.rejected, (state, action) => {
            state.loading = false;
            state.errors = action?.error?.message;
        })

        // deleteTodo

        .addCase(deleteTodo.pending, (state, action) => {
            state.loading = true;
            state.errors = null;
        })
        .addCase(deleteTodo.fulfilled, (state, action) => {
            state.loading = false;
            state.errors = null;
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        })
        .addCase(deleteTodo.rejected, (state, action) => {
            state.loading = false;
            state.errors = action?.error?.message;
        })
    }
})

export const todoReducer = todoSlice.reducer;