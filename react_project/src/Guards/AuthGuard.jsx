// import { useContext } from "react"
// import AuthContext from "../../contexts/authContext"
// import { Navigate } from "react-router-dom";
// import Toast from "../Toasts/toast";

import { useContext } from "react";
import AuthContext from "../contexts/authContext";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast, Slide } from 'react-toastify'; // Import toast function


export default function AuthGuard(props) {
    const { isAuthenticated } = useContext(AuthContext);
 
    if (!isAuthenticated) {
        // toast.info('You must be logged or registered first.'); // Display toast error
        toast.info('You must login or register first!', {
            position: "top-center",
            autoClose: 1700,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
        });
        return (
            <>
                 (<Navigate to="/" />)
            </>
        )
    }

    return (
        <>
            {props.children}
        </>
    );
}

// export default function AuthGuard(props) {
//     const { isAuthenticated } = useContext(AuthContext);
// if (!isAuthenticated) {


//     // alert('You must login first!')
//     return (
//         <>
//             <Toast />
//             <Navigate to="/" />
//         </>
//     )
// }


// return (
//     <>
//         {isAuthenticated && (
//             <>{props.children}</>
//         )}
//         {!isAuthenticated && (
//             <> {<Toast />}</>
//         )}

//     </>
// )
// }