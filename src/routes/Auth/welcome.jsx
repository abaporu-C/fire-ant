import { verifyUser } from "../../Services/authService"
import { Link, Navigate, useParams } from "react-router-dom";

export const Welcome = () => {
    let params = useParams();

    const user = verifyUser(params.confirmationCode);    
    
    return !(user instanceof Error)? (
        <>
            <header className="jumbotron">
            <h3>
                <strong>Account confirmed!</strong>
            </h3>
            </header>
            <Link to={"/login"}>
                Please Login
            </Link>
        </>
    ) : (<Navigate to="*" />)
}