
// properties of a component is passed as an object, not as function arguments
function TodoListItem({item, onClickRemoveTodo, onChangeTodoStatus }) {

    return (
        <div className="list-group-item" >
            <div className="row justify-content-center">
                <div className="col-2">
                    <input type="checkbox" className="form-check-input" checked={item.status} 
                        // using method reference instead of inline fuction is more accepted
                        onChange={(e)=> { if (onChangeTodoStatus) onChangeTodoStatus(item, e.target.checked) }} />
                </div>
                <div className="col-8">
                    <span onClick={() => alert(item.title)} >{item.title}</span>
                </div>
                <div className="col-2">
                    <button className="btn btn-danger" 
                            onClick={()=> { if (onClickRemoveTodo) { onClickRemoveTodo(item)} }}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default TodoListItem;