import UserProfileHeader from "./UserProfileHeader";
import './UserProfile.css'
import { useContext } from "react";
import AuthContext from "../../contexts/authContext";
import * as localService from '../../services/localStorageService'
import * as authService from '../../services/authService'
import usePersistedState from "../../hooks/usePersistedState";

export function UserProfile(){
    const { updateHandler } = useContext(AuthContext);
    const loadData = localService.getItem('userData');
    loadData.username = 'Hasan';
    console.log(loadData);


   async function updateUser(){
    const sendData = JSON.stringify(loadData)
        const result = await authService.update(sendData);
        updateHandler(result);
        console.log(result);
    }
    return(
        <>  
                {/* <UserProfileHeader /> */}

            <div className="container-xxl py-5">
                <div className="container border">
                    <div className="row g-5 justify-content-center">
                        <div className="col-sm-3 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="profile-image-wrapper border bg-light">
                                <img src="../../../public/img/user_profile.jpg" alt="" />
                            </div>
                            <button className="btn btn-primary" onClick={updateUser}>Change</button>
                        </div>
                        <div className="col-lg-9 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="w-200 h-200 border bg-light">
                                <h3>Here are my data</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}