import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { createTodo } from '../features/todoSlice';

export default function TodoInput() {

    const dispatch = useDispatch();
    const refTitle = useRef();

    function handleClickSave() {
        const title = refTitle.current.value;
        dispatch(createTodo({ title }));
    }

    return (
        <Stack direction='horizontal' gap={2}>
            <Form.Control ref={refTitle} placeholder='Enter todo' />
            <Button onClick={handleClickSave} variant='success' >Save</Button>
        </Stack>
    );
}