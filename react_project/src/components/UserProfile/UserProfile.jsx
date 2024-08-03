import UserProfileHeader from "./UserProfileHeader";
import './UserProfile.css'
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/authContext";
import * as localService from '../../services/localStorageService'
import * as authService from '../../services/authService'

export function UserProfile() {
    const { updateHandler } = useContext(AuthContext);
    const [userData, setUserData] = useState({});


    useEffect(() => {
        const loadData = localService.getItem('userData');
        // loadData.username = 'Hasan';
        console.log(loadData);
        setUserData(loadData);
    }, [])



    //    async function updateUser(){
    //     const sendData = JSON.stringify(loadData)
    //         const result = await authService.update(sendData);
    //         updateHandler(result);
    //         console.log(result);
    //     }
    return (
        <>
            {/* <UserProfileHeader /> */}

            {userData && <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-5 justify-content-center">
                        <div className="col-sm-3 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="profile-image-wrapper shadow-lg">
                                <img src="../../../public/img/people/smilled-woman2.png" alt="" />
                            </div>
                            <div class="file-upload">
                                <input type="file" id="file" className="file-input" accept=".jpg, .jpeg, .png, .gif" />
                                <label for="file" className="file-label" data-bs-toggle="tooltip" title="Change Your Picture">+</label>
                                    {/* <span className="file-name">Няма избран файл</span> */}
                            </div>
                        </div>
                        <div className="col-lg-9 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="bg-light rounded-3 shadow">
                                <form className="row g-3 py-5">
                                    <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
                                        <div className="col-md-8 input-wrapper">
                                            <label for="name" className="form-label my-0">Name:</label>
                                            <input type="text" className="form-control-plaintext" id="name" value={userData.name || userData.username} required />
                                        </div>
                                        <div className="col-md-8 input-wrapper">
                                            <label for="lastname" className="form-label my-0">Last Name:</label>
                                            <input type="text" className="form-control-plaintext" id="lastName" value={userData.lastname || ''} required />
                                        </div>
                                        <div className="col-md-8 input-wrapper">
                                            <label for="email" className="form-label my-0">Email:</label>
                                            <input type="email" className="form-control-plaintext" id="email" value={userData.email || ''} required />
                                        </div>
                                    </div>
                                    <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
                                        <div className="col-md-8 input-wrapper">
                                            <label for="phone" className="form-label my-0">Phone:</label>
                                            <input type="tel" className="form-control-plaintext" id="phone" value={userData.phone || ''} required />
                                        </div>
                                        <div className="col-md-8 input-wrapper">
                                            <label for="city" className="form-label my-0">City:</label>
                                            <input type="text" className="form-control-plaintext" id="city" value={userData.city || ''} required />
                                        </div>
                                        <div className="col-md-8 input-wrapper">
                                            <label for="birthdate" className="form-label my-0">Birth Date:</label>
                                            <input type="text" className="form-control-plaintext" id="birthdate" value={userData.date || ''} required />
                                        </div>
                                    </div>
                                    <div className="col-12 d-flex justify-content-center mt-5">
                                        <button className="btn btn-primary col-2" data-bs-toggle="tooltip" title="Edit Your Data">Edit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
        </>
    )
}