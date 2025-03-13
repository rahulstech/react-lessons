import { useContext } from "react";
import TodoContext from "../contexts/TodoContext";

// properties of a component is passed as an object, not as function arguments
function TodoListItem({ item, onClickRemoveTodo, onChangeTodoStatus }) {

    // const {updateTodoStatus, removeTodo} = useContext(TodoContext);

    const handleOnChangeState = (e) => {
        // updateTodoStatus(item, e.target.checked);
        if (onChangeTodoStatus) {
            onChangeTodoStatus(item, e.target.checked);
        }
    }

    const handleOnClickTodo = () => {
        alert(item.title);
    }

    const handleOnClickDelete = () => {
        // removeTodo(item);
        if (onClickRemoveTodo) {
            onClickRemoveTodo(item);
        }
    }

    console.log(`rendering TodoItem id=${item.id}`);
    return (
        <div className="list-group-item" >
            <div className="row justify-content-center">
                <div className="col-2">
                    <input type="checkbox" className="form-check-input" checked={item.status} 
                        // using method reference instead of inline fuction is more accepted
                        onChange={handleOnChangeState} />
                </div>
                <div className="col-8">
                    <span onClick={handleOnClickTodo} >{item.title}</span>
                </div>
                <div className="col-2">
                    <button className="btn btn-danger" 
                            onClick={handleOnClickDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default TodoListItem;