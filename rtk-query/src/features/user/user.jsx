import Dropdown from 'react-bootstrap/Dropdown'
import { useGetAllUsersQuery } from './userSlice';
import { useState } from 'react';

export function UserChooser({ onChangeUser }) {
    const { data, isLoading, error } = useGetAllUsersQuery();
    const [selection,setSelection] = useState(null);

    function handleSelectionChange(entryKey) {
        let user;
        if (selection == -1) {
            setSelection(null);
            user = null;
        }
        else {
            user = data.find(user => user.id == entryKey);
            setSelection(user);
        }
        if (onChangeUser) {
            onChangeUser(user);
        }
    }

    return (
        <Dropdown onSelect={handleSelectionChange}>
            <Dropdown.Toggle>{ selection ? selection.name : "All" }</Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item eventKey="-1">All</Dropdown.Item>
                {
                    !isLoading &&
                    data.map((user) => (
                        <Dropdown.Item eventKey={user.id} key={user.id}>
                            {user.name}
                        </Dropdown.Item>
                    ))
                }
            </Dropdown.Menu>
        </Dropdown>
    )
}