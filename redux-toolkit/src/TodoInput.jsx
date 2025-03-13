import { useState } from "react";
import { addTodo } from './todoSlice';
import { useDispatch } from "react-redux";

export default function TodoInput() {
    const [title, setTitle] = useState('');
    const dispatcher = useDispatch();

    const handleAddTodo = (e) => {
        e.preventDefault();
        dispatcher(addTodo({ title }))
        setTitle('');
    }

    console.log('rendering todo-input');
    return (
        <form onSubmit={handleAddTodo} action='none' method='post'>
            <div className="row">
                <div className="col-sm-10">
                    <div className="form-group">
                        <input className="form-control" value={title} onChange={e => setTitle(e.target.value)} name="title" placeholder="Enter Title..." />
                    </div>
                </div>
                <div className="col-sm-2">
                    <button className="btn btn-success" type="submit">Add</button>
                </div>
            </div>
        </form>
    )
}