import { useContext } from "react"
import AuthContext from "../../contexts/authContext"
import { Navigate } from "react-router-dom";


export default function AuthGuard(props) {
    const { isAuthenticated } = useContext(AuthContext);
    if (!isAuthenticated) {
        alert('You must login first!')
        return <Navigate to="/" />
    }
    return (
        <>
            {props.children}
        </>
    )
}