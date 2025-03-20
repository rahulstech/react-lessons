import ListGroup from 'react-bootstrap/ListGroup'
import TodoListItem from './TodoListItem'
import Alert from 'react-bootstrap/Alert'
import { useCallback, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { deleteTodo, fetchAllTodos, updateTodo } from '../features/todoSlice';
import Stack from 'react-bootstrap/Stack';
import Spinner from 'react-bootstrap/Spinner';

export default function TodoList() {

    const {todos, loading, errors } = useSelector(state => state.todo);

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchAllTodos());
    },[]);

    const handleDeleteTodo = useCallback((id) => {
        dispatch(deleteTodo(id));
    }, []);

    const handleEditTodo = useCallback((id,title) => {
        dispatch(updateTodo({id, values: {title}}));
    }, []);

    const handleToggleTodoCompleted = useCallback((id, checked) => {
        dispatch(updateTodo({ id, values : {completed: checked}}));
    }, []);

    // when loading complete and have error then show error
    if (loading) {
        return (
            <Stack direction='horizontal' gap={3} className="mt-4 w-100 mx-auto">
                <Spinner animation='border' />
                <p>Loading todos...</p>
            </Stack>
        )
    }
    else if (errors) {
        return (
            <Alert variant='danger' className='mt-4' dismissible >{errors}</Alert>
        )
    }

    return (
        <ListGroup className="mt-4">
            {
                todos.map(todo => (
                    <TodoListItem key={todo.id} todo={todo} onToggleTodoCompleted={handleToggleTodoCompleted} 
                     onDeleteTodo={handleDeleteTodo} onEditTodo={handleEditTodo} />
                ))
            }
        </ListGroup>
    );
}