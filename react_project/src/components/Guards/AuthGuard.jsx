import { useContext } from "react"
import AuthContext from "../../contexts/authContext"
import { Navigate } from "react-router-dom";
import Toast from "../Toasts/toast";



export default function AuthGuard(props) {
    const { isAuthenticated } = useContext(AuthContext);
    // if (!isAuthenticated) {


    //     // alert('You must login first!')
    //     return (
    //         <>
    //             <Toast />
    //             <Navigate to="/" />
    //         </>
    //     )
    // }
    return (
        <>
            {isAuthenticated && (
                <>{props.children}</>
            )}
            {!isAuthenticated && (
                <> {<Toast />}</>
            )}

        </>
    )
}