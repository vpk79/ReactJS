import { useContext } from "react";
import AuthContext from "../contexts/authContext";
import { Navigate } from "react-router-dom";
import * as toast from '../Toasts/toastsMsg';


export default function AuthGuard(props) {
    const { isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated) {
        toast.showInfoToast("You must login or register first!");
        return (
            <>
                (<Navigate to="/" />)
            </>
        )
    };

    return (
        <>
            {props.children}
        </>
    );
}

