import TodoListItem from "./TodoListItem"

// accepts todosState as props from parent
function TodoList({ todosState }) {

    const [todos, setTodos] = todosState;

    // callback to handle remove todo item event
    const handleRemoveTodo = (todo) => {
        // filter out the todo and set the remaining items to state
        setTodos(todos.filter(v => v.id != todo.id));
    }

    // callback to handle todo item status chage
    const handleChangeTodoStatus = (todo, checked) => {

        // find todo by id and change its state
        todos.map( todoItem => {
            if (todoItem.id === todo.id) {
                // do not just change the existing property value
                // instead return a new object with updated value
                // this is the recommended way for React state object
                return { ...todoItem, status: checked };
            }
            return todoItem;
        });
        // set the updated todos. here i am using a new array of updated todos
        setTodos([...todos]);
    }

    return (
        <div className="list-group">
            {
                todos.map(v => 
                    <TodoListItem 
                        key={v.id} // key is required to uniquely identify the component by react, value of key must be unique in its parent
                        item={v} // todo object as item property
                        onClickRemoveTodo={handleRemoveTodo} // add remove item event handler
                        onChangeTodoStatus={handleChangeTodoStatus} // attact todo status change event handler
                    /> 
                )
            }
        </div>
    );
}

export default TodoList