import { useRef, useState } from "react";
import useAppContext from "../AppContext";
import { Link } from 'react-router-dom';

export default function Input() {

    const { name, updateName } = useAppContext();
    const [nameInput, setNameInput] = useState(name);
    const refName = useRef();

    return (
        <div>
            <Link className="btn btn-link" to="/">Go To Show</Link>
            <div className="mb-3">
                <label id="labelName" className="form-label">Enter Name</label>
                <input ref={refName} aria-labelledby="labelName"  type="text" className="form-control"  value={nameInput} 
                onChange={e => setNameInput(e.target.value)}/>
            </div>
            <button className="btn btn-primary" onClick={(e) => updateName(refName.current.value)}>Set Name</button>
        </div>
    )
}