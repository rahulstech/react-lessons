import { useContext, useState } from "react";
import TodoContext from "../contexts/TodoContext";

function TodoInput({ todosState }) {
    // input title state
    const [title, setTitle] = useState('');
    const { addTodo } = useContext(TodoContext);

    const handleSaveTodo = () => {
        if (!title) {
            alert('title is empty');
            return;
        }
        const todo = {
            id: Math.floor( Math.random()*99999 + 1 ),
            title,
            status: false
        };
        addTodo(todo);
        // reset the title input field
        setTitle('');
    }

    console.log('rending TodoInput');
    return (
        <div className="row">
            <div className="col-9">
                <input id="inputTitle" placeholder="Title" type="text" value={title} onChange={(e)=>setTitle(e.target.value)} name="title"  />
            </div>
            <div className="col-3">
                <button type="submit" className="btn btn-success" onClick={handleSaveTodo}>Save</button>
            </div>
        </div>
    );
}

export default TodoInput;