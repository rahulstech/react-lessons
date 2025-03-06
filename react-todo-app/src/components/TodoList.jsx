import { useContext } from "react";
import TodoListItem from "./TodoListItem"
import TodoContext from "../contexts/TodoContext";

function TodoList() {

    const { getAllTodos } = useContext(TodoContext);

    return (
        <div className="list-group">
            {
                getAllTodos().map(v => 
                    <TodoListItem 
                        key={v.id} // key is required to uniquely identify the component by react, value of key must be unique in its parent
                        item={v} // todo object as item property
                    /> 
                )
            }
        </div>
    );
}

export default TodoList