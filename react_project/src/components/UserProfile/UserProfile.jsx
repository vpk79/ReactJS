import UserProfileHeader from "./UserProfileHeader";
import './UserProfile.css'
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/authContext";
import * as localService from '../../services/localStorageService'
import * as authService from '../../services/authService'
import { uploadImage } from "../../services/imageUpload";
import { showErrorToast, showSuccessToast } from "../../Toasts/toastsMsg";
import { delay } from "../../utils/utils";

export function UserProfile() {
    const { updateHandler } = useContext(AuthContext);
    const [userData, setUserData] = useState({});
    const [file, setFile] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [tempData, setTempData] = useState({});

    useEffect(() => {
        const loadData = localService.getItem('userData');
        setUserData(loadData);
        setTempData(loadData);
    }, [])

    const editModeHandle = (e) => {
        e.preventDefault();
        setEditMode(true);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if(name === 'email' || name === 'date'){
            showErrorToast('Change not allowed!', {toastId:"changeError"});
            setUserData(tempData);
            return;
        }
        setUserData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        console.log(name);
    };

    const cancelHandler = (e) => {
        e.preventDefault();
        setUserData((state) => ({ ...state, ...tempData }));
        setEditMode(false);
        console.log(userData);
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        // console.log('selectedFile', selectedFile);
        if (selectedFile) {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!allowedTypes.includes(selectedFile.type)) {
                showErrorToast('Only pictures allowed (JPEG, PNG, GIF)', { toastId: 'wrongType' })
                e.target.value = '';
                setFile(null);
            } else {
                setFile(selectedFile);
            }
        } else {
            setFile(null);
        }
    };

    useEffect(() => {
        const handleUpload = async () => {
            // console.log('file', file);
            if (!file) return;
            try {
                const url = await uploadImage(file);
                const newData = Object.assign(userData, { imageurl: url });
                setUserData(newData);
                delay(300);
                updateUser(newData);
                setFile(null);
            } catch (err) {
                showErrorToast(err.message, { toastId: 'imageUpload' })
                console.error(err);
            }
        };

        handleUpload();
    }, [file]);


    // form submit
    function updateUserHandler(e){
        e.preventDefault();
        console.log(userData);
        try {
            updateUser(userData);
            setEditMode(false); 
            showSuccessToast('User profil updated!', {toastId: 'updateSuccess'})
        } catch (error) {
            showErrorToast(error.message, {toastId:'errorUpdate'})
        }
        
    }

    /* update user on server */
    async function updateUser(data) {
        try {
            localService.clearStorage();
            localService.setItem(data);
            const sendData = JSON.stringify(data)
            const result = await authService.update(sendData);
            updateHandler(result);
            console.log(result);
        } catch (error) {
            console.log(error);
            showErrorToast(err.message, { toastId: 'updateError' });
        }
    }

    return (
        <>
            {/* <UserProfileHeader /> */}

            {userData && <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-5 justify-content-center">
                        <div className="col-sm-3 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="profile-image-wrapper shadow-lg">
                                <img src={userData.imageurl} alt="" />
                            </div>
                            <div className="file-upload">
                                <input type="file" id="file"
                                    className="file-input"
                                    name="file"
                                    accept=".jpg, .jpeg, .png, .gif"
                                    onChange={handleFileChange} />
                                <label htmlFor="file" className="file-label" data-bs-toggle="tooltip" title="Change Your Picture">+</label>
                                {/* <span className="file-name">Няма избран файл</span> */}
                            </div>
                        </div>
                        <div className="col-lg-9 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="bg-light rounded-3 shadow">
                                <form className="row py-5" onSubmit={updateUserHandler}>
                                    <div className="form-side col-md-6 d-flex flex-column justify-content-center align-items-center">
                                        <div className="col-md-8 input-wrapper">
                                            <label htmlFor="name" className="form-label my-0">Name:</label>
                                            <input type="text"
                                                className={`user-form-input ${editMode ? 'form-control-sm' : 'form-control-plaintext'}`}
                                                id="name"
                                                name='name'
                                                value={userData.name || userData.username}
                                                required
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="col-md-8 input-wrapper">
                                            <label htmlFor="lastname" className="form-label my-0">Last Name:</label>
                                            <input type="text"
                                                className={`user-form-input ${editMode ? 'form-control-sm' : 'form-control-plaintext'}`}
                                                id="lastName"
                                                name='lastname'
                                                value={userData.lastname || ''}
                                                onChange={handleInputChange}
                                                required />
                                        </div>
                                        <div className="col-md-8 input-wrapper">
                                            <label htmlFor="email" className="form-label my-0">Email:</label>
                                            <input type="email"
                                                className="user-form-input form-control-plaintext"
                                                id="email"
                                                name='email'
                                                tabIndex="-1"
                                                value={userData.email || ''}
                                                onChange={handleInputChange}
                                                required />
                                        </div>
                                    </div>
                                    <div className="form-side col-md-6 d-flex flex-column justify-content-center align-items-center">
                                        <div className="col-md-8 input-wrapper">
                                            <label htmlFor="phone" className="form-label my-0">Phone:</label>
                                            <input type="tel"
                                                className={`user-form-input ${editMode ? 'form-control-sm' : 'form-control-plaintext'}`} id="phone"
                                                name='phone'
                                                value={userData.phone || ''}
                                                onChange={handleInputChange}
                                                required />
                                        </div>
                                        <div className="col-md-8 input-wrapper">
                                            <label htmlFor="city" className="form-label my-0">City:</label>
                                            <input type="text"
                                                className={`user-form-input ${editMode ? 'form-control-sm' : 'form-control-plaintext'}`}
                                                id="city"
                                                value={userData.city || ''}
                                                name='city'
                                                onChange={handleInputChange}
                                                required />
                                        </div>
                                        <div className="col-md-8 input-wrapper" >
                                            <label htmlFor="birthdate" className="form-label my-0">Birth Date:</label>
                                            <input type="text"
                                                className="user-form-input form-control-plaintext"
                                                name='date'
                                                id="birthdate"
                                                tabIndex="-1"
                                                value={userData.date || ''}
                                                onChange={handleInputChange}
                                                required />
                                        </div>
                                    </div>
                                    {!editMode && <div className="col-12 d-flex justify-content-center mt-5">
                                        <button
                                            className="btn btn-primary col-2"
                                            data-bs-toggle="tooltip"
                                            title="Edit Your Data"
                                            onClick={editModeHandle}
                                        >Edit</button>
                                    </div>
                                    }
                                    {editMode && <div className="col-12 d-flex justify-content-center mt-5">
                                        <button
                                            type="submit"
                                            className="btn btn-primary col-2"
                                            data-bs-toggle="tooltip"
                                            title="Edit Your Data"
                                        >Save</button>
                                        <button
                                            className="btn btn-primary col-2"
                                            data-bs-toggle="tooltip"
                                            title="Edit Your Data"
                                            onClick={cancelHandler}
                                        >Cancel</button>
                                    </div>
                                    }
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