import { useContext, useEffect } from "react";
import * as authService from '../../services/authService'
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/authContext";

export default function Logout(){

    const navigate = useNavigate;
    const { logoutHandler} = useContext(AuthContext);

    useEffect(() => {
        authService.logout()
            .then(() => logoutHandler())
            .catch(()=> {
                alert('Something went wrong');
                throw new Error('Something went wrong');
            })
    }, [])
    return null;
}