import { Link } from "react-router-dom";
import useAppContext from "../AppContext"

export default function Show() {
    const { name } = useAppContext();

    return (
        <div>
            <p className="display-5">Hello {name || 'Guest'}</p>
            <Link to="/input" className="btn btn-link">Go To Input</Link>
        </div>
    )
}