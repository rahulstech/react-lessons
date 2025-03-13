import { useContext } from "react";
import TodoListItem from "./TodoListItem"
import TodoContext from "../contexts/TodoContext";

function TodoList() {

    const { getAllTodos, removeTodo, updateTodoStatus } = useContext(TodoContext);

    console.log('rendering TodoList');
    return (
        <div className="list-group">
            {
                getAllTodos().map(v => 
                    <TodoListItem 
                        key={v.id} // key is required to uniquely identify the component by react, value of key must be unique in its parent
                        item={v} // todo object as item property
                        onClickRemoveTodo={(todo) => removeTodo(todo)}
                        onChangeTodoStatus={(todo, complete) => updateTodoStatus(todo, complete)}
                    /> 
                )
            }
        </div>
    );
}

export default TodoList