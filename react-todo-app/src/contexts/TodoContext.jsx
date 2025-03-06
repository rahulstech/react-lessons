import { createContext, useCallback, useEffect, useMemo, useState } from "react";

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
    // in useState i can either pass inital value or a callback function, called state initializer
    // which returns an initial value.
    // here instead of using no dependency useEffect hook i am using state initializer
    // which is more authentic according to the purpose.
    const [todos, setTodos] = useState(() => {
        const localTodos = localStorage.getItem('todos');
        if (localTodos) {
            const _todos = JSON.parse(localTodos);
            if (_todos.length > 0) {
                return _todos;
            }
        }
        return [];
    });

    /** 
     * crud methods to perfrom verious operations on todos.
     */

    const getAllTodos = () => todos;

    const addTodo = (todo) => {
        setTodos((oldTodos) => [
            ...oldTodos,
            todo
        ]);
        console.log(`new todo added id=${todo.id}`);
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
        console.log(`todo status updated id=${todo.id}`);
    };

    const removeTodo = (todo) => {
        setTodos((oldTodos) => {
            return oldTodos.filter(v => v.id !== todo.id);
        });
        console.log(`todo removed id=${todo.id}`);
    };

    // useEffect(callback,[dependency1, dependency2, ...])
    // whenever one or more dependencies changes the callback method is called
    // thus this hook is useful when I performing some task which depends on multiple states
    useEffect(() => {
        if (todos.length > 0) {
            const _todos = JSON.stringify(todos);
            localStorage.setItem('todos', _todos);
        }
    }, [todos]);

    // without any dependency callback is called only once
    // useEffect(() => {
    //     const localTodos = localStorage.getItem('todos');
    //     if (localTodos) {
    //         const _todos = JSON.parse(localTodos);
    //         if (_todos.length > 0) {
    //             setTodos(_todos); 
    //         }
    //     }
    // }, []);

    const contxtValue = { getAllTodos, addTodo, updateTodoStatus, removeTodo };

    /**
     * FIX: components that use useContext get rendered whenever there is a change in todos.
     *      this is because todos state is used in TodoContext. but components that don't use
     *      useContext they are not affected for this. 
     *      for the same reason if i change the todo status of a todo then only that TodoListItem
     *      should re-render but all the TodoListItems are re-rendered. 
     */
    return (
        <TodoContext.Provider  
        // whatever passed to value property here will be returned by useContext(TodoContext)
        // so here I am passing an object of todo crud methods so when ever i call useContext(TodoContext)
        // I will get this object and access these methods.
        //
        // but here is a problem. i am passing todos, the state object, as property of component, therefore
        // whenever todos is changed all the children of TodoContextProvider is rendered again. but it may not
        // be required to render all the children components each time todos state changes.
        value={contxtValue}
        >
            {children}
        </TodoContext.Provider>
    );
}







