import { createSlice } from '@reduxjs/toolkit';

function generateId() {
    return Math.floor(Math.random()*999999 + 1);
}

const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todos: [],
    },
    reducers: {
        addTodo: (state, action) => {
            state.todos.push({
                title: action.payload.title,
                completed: false,
                id: generateId(),
            });
        },

        updateTodoCompletion: (state, action) => {
            const { id, completed } = action.payload;
            state.todos = state.todos.map(todo => {
                if (todo.id === id) {
                    todo.completed = completed;
                }
                return todo;
            })
        },

        removeTodo: (state, action) => {
            const updatedTodos = state.todos.filter( todo => todo.id !== action.payload.id )
            state.todos = updatedTodos;
        }
    }
});

export const { addTodo, removeTodo, updateTodoCompletion } = todoSlice.actions;

export const todoReducer = todoSlice.reducer