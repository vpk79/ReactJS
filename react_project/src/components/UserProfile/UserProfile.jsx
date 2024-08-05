import UserProfileHeader from "./UserProfileHeader";
import './UserProfile.css'
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/authContext";
import * as localService from '../../services/localStorageService'
import * as authService from '../../services/authService'
import { uploadImage } from "../../services/imageUpload";
import { showErrorToast, showSuccessToast } from "../../Toasts/toastsMsg";
import { delay } from "../../utils/utils";
import * as request from "../../lib/request";
import { APPOINTMENTS } from "../../const/const";
import { Link } from "react-router-dom";

export function UserProfile() {
    const { updateHandler, userId } = useContext(AuthContext);
    const [userData, setUserData] = useState({});
    const [file, setFile] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [tempData, setTempData] = useState({});
    const [menu, setMenu] = useState('Profile')
    const [appointments, setAppointments] = useState([]);
    const [showInfo, setShowInfo] = useState(false);

    useEffect(() => {
        const loadData = localService.getItem('userData');

        const loadAppointments = async () => {
            const data = await request.get(`${APPOINTMENTS}?where=_ownerId%3D%22${userId}%22`);
            setAppointments(data);
            console.log(data);
        }
        setUserData(loadData);
        setTempData(loadData);

        loadAppointments();
    }, [])

    const editModeHandle = (e) => {
        e.preventDefault();
        setEditMode(true);

        useEffect(() => {
            console.log(appointments);
        }, [appointments])
    }

    function menuHandler(e) {
        e.preventDefault();
        const value = e.target.textContent;

        setMenu(value);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email' || name === 'date') {
            showErrorToast('Change not allowed!', { toastId: "changeError" });
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

    const toggleShowInfo = () => {
        setShowInfo(!showInfo);
    }

    // form submit
    function updateUserHandler(e) {
        e.preventDefault();
        console.log(userData);
        try {
            updateUser(userData);
            setEditMode(false);
            showSuccessToast('User profil updated!', { toastId: 'updateSuccess' })
        } catch (error) {
            showErrorToast(error.message, { toastId: 'errorUpdate' })
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

            {!!userData.email && <div className="container-xxl py-5">
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
                            <div className="sub-menu-wrapper">
                                <ul className="sub-menu" >
                                    <li className={`bg-light btn menuBtn ${menu === 'Profile' ? 'selected' : ''}`} onClick={menuHandler}>Profile</li>
                                    <li className={`bg-light btn menuBtn ${menu === 'My Appointments' ? 'selected' : ''}`} onClick={menuHandler}>My Appointments</li>
                                    <li className={`bg-light btn menuBtn ${menu === 'Last Appointments' ? 'selected' : ''}`} onClick={menuHandler}>Last Appointments</li>
                                    <li className={`bg-light btn menuBtn ${menu === 'History' ? 'selected' : ''}`} onClick={menuHandler}>History</li>
                                </ul>
                            </div>
                        </div>
                        {menu === 'Profile' && <div className="col-lg-9 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="bg-light rounded-3 shadow">
                                <form className="row py-5" onSubmit={updateUserHandler}>
                                    <div className="form-side col-md-6 d-flex flex-column justify-content-center align-items-center">
                                        <div className="col-md-8 input-wrapper">
                                            <label htmlFor="name" className="form-label my-0">Name:</label>
                                            <input type="text"
                                                className={` ${editMode ? 'form-control-sm user-form-input' : 'form-control-plaintext'}`}
                                                id="name"
                                                name='name'
                                                tabIndex='-1'
                                                value={userData.name || userData.username}
                                                required
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="col-md-8 input-wrapper">
                                            <label htmlFor="lastname" className="form-label my-0">Last Name:</label>
                                            <input type="text"
                                                className={`${editMode ? 'form-control-sm user-form-input' : 'form-control-plaintext'}`}
                                                id="lastName"
                                                name='lastname'
                                                tabIndex='-1'
                                                value={userData.lastname || ''}
                                                onChange={handleInputChange}
                                                required />
                                        </div>
                                        <div className="col-md-8 input-wrapper">
                                            <label htmlFor="email" className="form-label my-0">Email:</label>
                                            <input type="email"
                                                className="form-control-plaintext"
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
                                                className={`${editMode ? 'form-control-sm user-form-input' : 'form-control-plaintext'}`} id="phone"
                                                name='phone'
                                                tabIndex='-1'
                                                value={userData.phone || ''}
                                                onChange={handleInputChange}
                                                required />
                                        </div>
                                        <div className="col-md-8 input-wrapper">
                                            <label htmlFor="city" className="form-label my-0">City:</label>
                                            <input type="text"
                                                className={`${editMode ? 'form-control-sm user-form-input' : 'form-control-plaintext'}`}
                                                id="city"
                                                tabIndex='-1'
                                                value={userData.city || ''}
                                                name='city'
                                                onChange={handleInputChange}
                                                required />
                                        </div>
                                        <div className="col-md-8 input-wrapper" >
                                            <label htmlFor="birthdate" className="form-label my-0">Birth Date:</label>
                                            <input type="text"
                                                className="form-control-plaintext"
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
                                            className="btn text-white bg-primary bg-gradient col-2 editBtn"
                                            data-bs-toggle="tooltip"
                                            title="Edit Your Data"
                                            onClick={editModeHandle}
                                        >Edit</button>
                                    </div>
                                    }
                                    {editMode && <div className="col-12 wrapper d-flex justify-content-center  mt-5">
                                        <button
                                            type="submit"
                                            className="btn text-white bg-primary bg-gradient col-2 editBtn "
                                            data-bs-toggle="tooltip"
                                            title="Edit Your Data"
                                        >Save</button>
                                        <button
                                            className="btn text-white bg-primary bg-gradient col-2 editBtn "
                                            data-bs-toggle="tooltip"
                                            title="Edit Your Data"
                                            onClick={cancelHandler}
                                        >Cancel</button>
                                    </div>
                                    }
                                </form>
                            </div>
                        </div>
                        }
                        {menu === 'My Appointments' &&
                            <div className="col-lg-9 d-flex py-2 flex-column  align-items-center justify-content-center  wow fadeInUp bg-light rounded-3 shadow" data-wow-delay="0.1s">
                                {/* <div className="apoitments-empty col-12  d-flex py-2 flex-column align-items-center justify-content-center">
                                    <p className="calendar-icon"><i className="fas fa-calendar-alt "></i></p>
                                    <h4>You have not any appoitments yet</h4>
                                    <p className="fw-bold">Choose a doctor and make appointment now!</p>
                                    <Link to="/appointment" className="btn btn-primary">Appointment</Link>
                                </div> */}
                                {!showInfo &&
                                    <div className="col-12 d-flex py-2 flex-row align-self-baseline flex-wrap">
                                        <div className="col-sm-3 calendar-wrapper" onClick={toggleShowInfo}>
                                            <img
                                                src="../../../public/img/calendar_frame.png" alt=""
                                                className="img-fluid bg-light p-2 mx-auto mb-4"
                                            ></img>
                                            <div className="date-wrapper d-flex flex-column align-items-center justify-content-center">
                                                <p className="date-day my-0">28</p>
                                                <p className="date-month my-0">март</p>
                                                <p className="date-hour my-0">14:30 h</p>
                                            </div>
                                        </div>
                                        <div className="col-sm-3 align-self-baseline justify-self-start" onClick={toggleShowInfo}>
                                            <img
                                                src="../../../public/img/calendar_frame.png" alt=""
                                                className="img-fluid bg-light  p-2 mx-auto mb-4"
                                            ></img>
                                        </div>
                                        <div className="col-sm-3 align-self-baseline justify-self-start" onClick={toggleShowInfo}>
                                            <img
                                                src="../../../public/img/calendar_frame.png" alt=""
                                                className="img-fluid bg-light  p-2 mx-auto mb-4"
                                            ></img>
                                        </div>
                                        <div className="col-sm-3 align-self-baseline justify-self-start" onClick={toggleShowInfo}>
                                            <img
                                                src="../../../public/img/calendar_frame.png" alt=""
                                                className="img-fluid bg-light  p-2 mx-auto mb-4"
                                            ></img>
                                        </div>
                                        <div className="col-sm-3 align-self-baseline justify-self-start" onClick={toggleShowInfo}>
                                            <img
                                                src="../../../public/img/calendar_frame.png" alt=""
                                                className="img-fluid bg-light  p-2 mx-auto mb-4"
                                            ></img>
                                        </div>
                                        <div className="col-sm-3 align-self-baseline justify-self-start" onClick={toggleShowInfo}>
                                            <img
                                                src="../../../public/img/calendar_frame.png" alt=""
                                                className="img-fluid bg-light  p-2 mx-auto mb-4"
                                            ></img>
                                        </div>
                                        <div className="col-sm-3 align-self-baseline justify-self-start" onClick={toggleShowInfo}>
                                            <img
                                                src="../../../public/img/calendar_frame.png" alt=""
                                                className="img-fluid bg-light  p-2 mx-auto mb-4"
                                            ></img>
                                        </div>
                                        <div className="col-sm-3 align-self-baseline justify-self-start" onClick={toggleShowInfo}>
                                            <img
                                                src="../../../public/img/calendar_frame.png" alt=""
                                                className="img-fluid bg-light  p-2 mx-auto mb-4"
                                            ></img>
                                        </div>
                                    </div>


                                }
                                {showInfo && <div className="col-12 d-flex py-2 flex-column align-items-center justify-content-center">
                                    <div className="row col-12">
                                        <div className="col-2 border py-2">
                                            <button onClick={toggleShowInfo} className="btn btn-secondary btn-sm backBtn">
                                                <i class="fas fa-times"></i></button>
                                            <p className="fs-1 my-0 btn calendarBtn"><i className="far fa-calendar-alt"></i></p>
                                            <p className="py-0 fw-bold">Change date</p>
                                        </div>
                                        <div className="col-4 border py-2 d-flex flex-column justify-content-center">
                                            <p className="my-2">Час в кабинета:</p>
                                            <h6>Вторник, 26 март 2024, 16:00</h6>

                                        </div >
                                        <div className="col-6 border d-flex justify-content-between py-2">
                                            <div className="d-flex flex-column justify-content-center">
                                                <p className="my-2">Оставащо време:</p>
                                                <h6>4 дена и 12 часа</h6>
                                            </div>
                                            <div>
                                                <button className="btn btn-sm btn-secondary btnCancel">Отмяна на часа</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row col-12">
                                        <div className="col-2 border d-flex flex-column justify-content-center align-items-center">
                                            <img
                                                src="/img/team-1.jpg" alt=""
                                                className="img-fluid  p-2 mx-auto mb-4"
                                            ></img>
                                        </div>
                                        <div className="col-4 border d-flex flex-column justify-content-center align-items-center">
                                            <h6>Д-р Стоянова</h6>
                                            <p>Дентален специалист</p>
                                        </div >
                                        <div className="col-6 border">
                                            <div>
                                                <p className="my-1 text-decoration-underline">Кабинет:</p>
                                                <h6>str. Tzar Ivan Shishman 81, fl.1</h6>
                                            </div>
                                            <div className="">
                                                <p className="my-1 text-decoration-underline">Работно време:</p>
                                                <p className="my-1 fw-bold text-center">Monday Wednesday Friday</p>
                                                <h6 className="text-center">8:30 - 13:30</h6>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="row col-12 ">
                                        <div className="col-2 border d-flex flex-column justify-content-center align-items-center">
                                            <img
                                                src={userData.imageurl} alt=""
                                                className="img-fluid p-0 mx-auto"
                                            ></img>
                                        </div>
                                        <div className="col-4 border d-flex flex-column justify-content-center align-items-center">
                                            <h6>Patient:</h6>
                                            <p>{userData.name}&nbsp;&nbsp;{userData.lastname}</p>
                                        </div >
                                        <div className="col-6 border py-2 d-flex flex-column justify-content-center align-items-center">
                                            <h6>Complaints:</h6>
                                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel facilis nemo quas quibusdam accusamus unde vero autem totam modi est?</p>
                                        </div>
                                    </div>
                                </div>
                                }
                            </div>

                        }
                    </div>
                </div>
            </div >
            }
        </>
    )
}