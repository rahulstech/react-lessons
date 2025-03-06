import { createContext, useState } from "react";

// create new context object. optionally i can pass initial value as createContext argument
const TodoContext = createContext();

// need to export because this will be used in useContext and thus i can access the context properties and methods
export default TodoContext

// i always need to create a Provider, a react component, and wrap components that wants to use this context inside this provide
// component like below
//
// <TodoContextProvider>
//   <Component1/>
//   <div></div>
//   ... <!-- other compoents goes here -->
// </TodoContextProvider>
//
// if the context is required by all components in App then it is good to wrap the App component inside the context proider component
// in main.jsx like this
//
// <TheContextProvider>
//   <App/>
// </TheContextProvider>
export const TodoContextProvider = ({children}) => {
    // a global state to store todos
    const [todos, setTodos] = useState([]);

    /** 
     * crud methods to perfrom verious operations on todos.
     */

    const getAllTodos = () => todos;

    const addTodo = (todo) => {
        setTodos([
            ...todos,
            todo
        ]);
    };

    const updateTodoStatus = (todo, newStatus) => {
        // don't read and write simultenously on state object like below.
        // setTodos(
        //     todos.map(todoItem => {
        //         if (todoItem.id === todo.id) {
        //             return { ...todoItem, status: newStatus};
        //         }
        //         return todoItem;
        //     })
        // );
        // instead pass a callback to state setter function that provides non-stateful argument 
        // which is the copy of actual state value. perform whatever operation on it  
        setTodos( currentTodos =>
            currentTodos.map(todoItem => {
                if (todoItem.id === todo.id) {
                    return { ...todoItem, status: newStatus};
                }
                return todoItem;
            })
        );
    };

    const removeTodo = (todo) => {
        setTodos(
            todos.filter(v => v.id !== todo.id)
        )
    }

    return (
        <TodoContext.Provider  
        // whatever passed to value property here will be returned by useContext(TodoContext)
        // so here I am passing an object of todo crud methods so when ever i call useContext(TodoContext)
        // I will get this object and access these methods.
        //
        // but here is a problem. i am passing todos, the state object, as property of component, therefore
        // whenever todos is changed all the children of TodoContextProvider is rendered again. but it may not
        // be required to render all the children components each time todos state changes.
        value={{ getAllTodos, addTodo, updateTodoStatus, removeTodo }}
        >
            {children}
        </TodoContext.Provider>
    );
}







