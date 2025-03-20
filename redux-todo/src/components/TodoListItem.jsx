import { memo, useRef, useState } from "react";
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'

const TodoListItem = memo(({ todo, onToggleTodoCompleted, onDeleteTodo, onEditTodo }) => {

    const [completed, setCompleted] = useState(todo.completed);
    const [eiditing, setEditing] = useState(false);
    const [title, setTitle] = useState(todo.title);

    function toggleCompleted(e) {
        if (onToggleTodoCompleted) {
            const checked = e.target.checked;
            onToggleTodoCompleted(todo.id, checked);
            setCompleted(checked);
        }
    }

    function handleDeleteTodo() {
        if (onDeleteTodo) {
            onDeleteTodo(todo.id);
        }
    }

    function handleEditTodo() {
        if (onEditTodo) {
            onEditTodo(todo.id, title);
        }
        setEditing(false);
    }

    return (
        <ListGroup.Item  className="w-100">
            <Row className="align-items-center">
                <Col xs='auto'>
                    <Form.Check onChange={toggleCompleted} checked={completed} />
                </Col>
                <Col className="fw-medium"> 
                    {
                        eiditing ?
                        <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)} />
                        : todo.title
                    }
                </Col>
                <Col xs='auto'>
                    {
                        eiditing ?
                        <Button onClick={handleEditTodo} className="bg-transparent border-0 text-primary"><i className="bi bi-floppy2-fill"></i></Button>
                        : <Button onClick={() => setEditing(true)} className="bg-transparent border-0 text-primary"><i className="bi bi-pencil-fill"></i></Button>
                    }
                    
                    <Button onClick={handleDeleteTodo} className="bg-transparent border-0 text-danger"><i className="bi bi-trash-fill"></i></Button>
                </Col>
            </Row> 
        </ListGroup.Item>
    );
})

export default TodoListItem