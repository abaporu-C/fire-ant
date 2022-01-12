import { Link } from "react-router-dom"

export const Landing = () => {
    return(
        <>
        <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
        </ul>
        <h1>Please, Login!</h1>
        </>
    )
}