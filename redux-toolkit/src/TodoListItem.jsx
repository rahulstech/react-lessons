import { useDispatch } from "react-redux"
import { removeTodo, updateTodoCompletion } from "./todoSlice";


export default function TodoListItem({ todo }) {
    const dispatcher = useDispatch();

    const handleToggleTodoCompletion = () => {
        dispatcher(updateTodoCompletion({ id: todo.id, completed: !todo.completed}));
    }
    
    const handleDeleteTodo = () => {
        dispatcher(removeTodo({ id: todo.id }));
    }

    console.log(`rendering todo item ${todo.title}`);
    return (
        <div className="list-group-item bg-primary-subtel">
            <div className="row">
            <div className="col-2">
                <input className="form-check-input" type="checkbox" checked={todo.completed} onChange={handleToggleTodoCompletion} />
            </div>
            
            <div className="col-sm-8">
                <span className=" h4">{todo.title}</span>
            </div>
            
            <div className="col-2">
                <button className="btn btn-danger" onClick={handleDeleteTodo} >Delete</button>
            </div>
            </div>
            
            
        </div>
    )
}