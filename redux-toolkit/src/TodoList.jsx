import { useSelector } from "react-redux";
import TodoListItem from "./TodoListItem";

export default function TodoList() {
    const todos = useSelector(state => state.todos);

    console.log(`rendering todo list with items ${todos.length}`)
    return (
        <div className="list-group mt-3">
            {
                todos.map( todo => (
                    <TodoListItem key={todo.id} todo={todo} />
                ))
            }
        </div>
    )
}