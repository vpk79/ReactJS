import './UserProfile.css'
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/authContext";
import * as localService from '../../services/localStorageService'
import * as authService from '../../services/authService'
import { uploadImage } from "../../services/imageUpload";
import { showErrorToast, showSuccessToast } from "../../Toasts/toastsMsg";
import { delay } from "../../utils/utils";
import * as request from "../../lib/request";
import { APPOINTMENTS, EMPLOYERS, FAVORITES, MAILS } from "../../const/const";
import { Link } from "react-router-dom";
import AppointmentInfo from "./ApoitmentInfo";
import AppointmentsCard from "./AppointmentsCard";
import TeamCard from '../Main/TeamComponent/TeamCard';
import ContactInfo from '../Main/TeamComponent/ContactInfo';
import { ConfirmToast } from 'react-confirm-toast';
import MessageCard from './MessageCard';
import MessageContent from './MessageContent';

export function UserProfile() {
    const { isAuthenticated, updateHandler, userId } = useContext(AuthContext);
    const [userData, setUserData] = useState({});
    const [file, setFile] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [tempData, setTempData] = useState({});
    const [menu, setMenu] = useState('Profile')
    const [appointments, setAppointments] = useState([]);
    const [showInfo, setShowInfo] = useState(false);
    const [employerData, setEmployerData] = useState([]);
    const [doctorName, setDoctorName] = useState('');
    const [appointmentData, setAppointmentData] = useState([]);
    const [likedData, setLikedData] = useState([]);
    const [personData, setPersonData] = useState({});
    const [tempLikedData, setTempLikedData] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [removeData, setRemoveData] = useState([]);
    const [messages, setMessages] = useState([]);
    const [openMessage, setOpenMessage] = useState(false);
    const [messageData, setMessageData] = useState({});
    const [checkedMails, setCheckedMails] = useState([]);

    useEffect(() => {
        const loadData = localService.getItem('userData');
        setUserData(loadData);
        setTempData(loadData);
        (async () => {
            const data = await request.get(`${APPOINTMENTS}?where=_ownerId%3D%22${userId}%22`);
            setAppointments(data);
        })();
        (async () => {
            const data = await request.get(`${FAVORITES}?where=_ownerId%3D%22${userId}%22`);
            if (data.length > 0) {
                setTempLikedData(data);
                // console.log(data);
                const changedId = data.map(item => {
                    return {
                        ...item,
                        _id: item.liked_id
                    };
                });
                setLikedData(changedId);
            }
        })();


        (async () => {
            const data = await request.get(`${MAILS}?where=_ownerId%3D%22${userId}%22`)
            if (data.length > 0) setMessages(data);
        })()

        return (() => {
            setAppointments([]);
            setLikedData([]);
        })
    }, [])

    useEffect(() => {
        if (showInfo && !!doctorName) {
            try {
                const getEmployersData = async () => {
                    const data = await request.get(`${EMPLOYERS}?where=name%3D%22${doctorName}%22`);
                    // console.log(data);
                    setEmployerData(data);
                }
                getEmployersData();
            } catch (error) {
                showErrorToast(error.message, { toastId: 'getEmployerError' })
            }

        }
    }, [showInfo, doctorName])


    const cancelAppointmentHandle = (id) => {
        const data = appointments.filter(x => x._id !== id);
        setAppointments(data);
    }

    // handle edit profile data
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
        setShowInfo(false);
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
        // console.log(userData);
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

    const choosedAppointment = (data) => {
        // console.log(data);
        setAppointmentData(data);
        if (!!data.Doctor) {
            setDoctorName(data.Doctor);
        }
    }

    // form submit
    function updateUserHandler(e) {
        e.preventDefault();
        // console.log(userData);
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
            // console.log(result);
        } catch (error) {
            console.log(error);
            showErrorToast(err.message, { toastId: 'updateError' });
        }
    }

    const personDetails = (data) => {
        if (!isAuthenticated) {
            toast.showInfoToast("You must login or register first!", {
                toastId: "login"
            })
            return;
        }
        setPersonData(data);
    };

    const unlikeHandle = async (data) => {
        const id = data._id;
        const getLikedId = tempLikedData.filter(x => x.liked_id == id)[0]._id;

        try {
            const removeLike = request.remove(`${FAVORITES}/${getLikedId}`);
            const removeLiked = likedData.filter(x => x._id != id);
            setLikedData(removeLiked);
        } catch (error) {
            showErrorToast(error.message, { toastId: "errorLikes" })
        }
    }

    const closeMessage = () => {
        setOpenMessage(false);
         setMessageData({});
         refreshData();
    }

    useEffect(() => {
        console.log(checkedMails);
    }, [checkedMails])

    const mailHandler =async (event) => {
        if (event.target.type == 'checkbox'){
            const id = event.target.id;
            if (event.target.checked) {
                setCheckedMails(state => ([...state, id]));
            } else {
                const data = checkedMails.filter(x => x != id);
                setCheckedMails(data);
            }
            return;
        } 
        event.preventDefault();
        // console.log(event.target.id);

        try {
            const id = event.target.id;
            const loadMsg = await request.get(`${MAILS}/${id}`);
            if(loadMsg.read == false){
                loadMsg.read = true;
                await request.patch(`${MAILS}/${id}`, loadMsg);
            }
            setMessageData(loadMsg);
            setOpenMessage(true);

        } catch (error) {
            showErrorToast(error.message, {toastId: 'errorMails'});
        }
    }

    const refreshData = async () => {
        const data = await request.get(`${MAILS}?where=_ownerId%3D%22${userId}%22`)
        setMessages(data);
    }

    const deleteMesagges = (event) => {
        event.preventDefault();
        if(checkedMails.length == 0) return;
        for(let id of checkedMails){
            try {
                const response = request.remove(`${MAILS}/${id}`);
            } catch (error) {
                showErrorToast(error.message, { toastId: 'errorMail2' });
            }
        }
        setCheckedMails([]);
        refreshData();
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
                                    <li className={`bg-light btn menuBtn ${menu === 'Messages' ? 'selected' : ''}`} onClick={menuHandler}>Messages</li>
                                    <li className={`bg-light btn menuBtn ${menu === 'Favorites' ? 'selected' : ''}`} onClick={menuHandler}>Favorites</li>
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
                                {appointments.length < 1 &&
                                    <div className="apoitments-empty col-12  d-flex py-2 flex-column align-items-center justify-content-center">
                                        <p className="calendar-icon"><i className="fas fa-calendar-alt "></i></p>
                                        <h4>You have not any appoitments yet</h4>
                                        <p className="fw-bold">Choose a doctor and make appointment now!</p>
                                        <Link to="/appointment" className="btn btn-primary">Appointment</Link>
                                    </div>

                                }
                                {!showInfo &&
                                    <div className="col-12 d-flex py-2 flex-row align-self-baseline flex-wrap">
                                        {appointments && appointments.map((data, index) =>
                                            <AppointmentsCard
                                                key={index}
                                                data={data}
                                                toggleShowInfo={toggleShowInfo}
                                                choosedAppointment={choosedAppointment}
                                            >
                                            </AppointmentsCard>
                                        )}
                                    </div>
                                }
                                {showInfo && employerData.length > 0 &&
                                    <AppointmentInfo
                                        employerData={employerData}
                                        toggleShowInfo={toggleShowInfo}
                                        userData={userData}
                                        appointmentData={appointmentData}
                                        cancelAppointmentHandle={cancelAppointmentHandle}
                                    ></AppointmentInfo>
                                }
                            </div>
                        }

                        {menu === 'Messages' &&
                            <div className="col-lg-9 border d-flex py-2 flex-column  align-items-center justify-content-center  wow fadeInUp bg-light rounded-3 shadow" data-wow-delay="0.1s">
                                <h5>Messages</h5>
                                {!openMessage && <div className='messages-header col-12 border row my-2'>
                                    <div className='col-6 d-flex align-items-center justify-content-around'>
                                        <span className='col-2 mx-2 d-inline-block'>
                                            <input className='p-3 border header-checkbox' type="checkbox" />
                                        </span>
                                        <span className='col-2 mx-n4 d-inline-block header-envelope'><i className="far fa-envelope-open"></i></span>
                                        <span className='col-1 mx-5 d-inline-block'><button className="btn" onClick={refreshData}><i className="fas fa-sync-alt"></i></button></span>
                                        <span onClick={deleteMesagges} className='col-2 d-inline-block'><i className="btn btn-secondary btn-sm fas fa-trash-alt"></i></span>

                                    </div>
                                    <div className='col-6 d-flex align-items-center justify-content-evenly'>
                                        <span className='col-2 d-inline-block'><button className="btn btn-secondary btn-sm">Sent</button></span>
                                        <span className='col-3 d-inline-block'><button className="btn btn-secondary btn-sm">Received</button></span>
                                        <span className='col-3 d-inline-block'><button className="btn btn-secondary btn-sm">Unreaded</button></span>
                                    </div>

                                </div >
                                }       

                                <div className='messages row col-12'>
                                    <form >
                                        <ul onClick={mailHandler} className='col-12 border messages-container'>
                                            {messages.length < 1 &&
                                                <div className="apoitments-empty col-12 my-5 d-flex py-2 flex-column align-items-center justify-content-center">
                                                    <p className="calendar-icon"><i className="fas fa-calendar-alt "></i></p>
                                                    <h4>You have no any messages</h4>
                                                </div>

                                            }
                                            {!openMessage && messages.length > 0 && messages.map(data => (
                                                <MessageCard key={data._id} data={data} />
                                            ))}
                                        </ul>
                                    </form>
                                    {openMessage && messageData &&
                                       <MessageContent data={messageData} closeMessage={closeMessage}/>                                    }
                                </div>

                            </div>}
                        {menu === 'Favorites' &&
                            <div className="col-lg-9 d-flex py-2 flex-row flex-wrap  align-items-center justify-content-center  wow fadeInUp bg-light rounded-3 shadow" data-wow-delay="0.1s">
                                {likedData.length < 1 &&
                                    <div className=" mt-5 col-12 d-flex flex-column align-items-center justify-content-center">
                                        <p className="calendar-icon"><i className="fas fa-calendar-alt "></i></p>
                                        <h4>Your favorites list is empty</h4>
                                    </div>
                                }
                                {likedData.length && <h2>Your Favorite Doctors</h2>}
                                <div className="col-lg-12  favorites-container d-flex flex-wrap wow fadeInUp bg-light rounded-3 shadow ">
                                    {likedData.length > 0 &&
                                        likedData.map((data, index) =>

                                            <>
                                                <button onClick={() => (setShowConfirm(true), setRemoveData(data))} className='btn unlikeBtn'><i className="fas fa-user-times" data-bs-toggle="tooltip" title="Remove"></i></button>
                                                <TeamCard key={data._id} data={data} delay={index * 200} personDetails={personDetails}>
                                                </TeamCard>

                                            </>
                                        )
                                    }
                                </div>


                            </div>
                        }

                        {menu === 'Last Appointments' &&

                            <div className="col-lg-9 d-flex py-2 flex-column  align-items-center justify-content-center  wow fadeInUp bg-light rounded-3 shadow" data-wow-delay="0.1s">
                                {appointments.length < 1 &&
                                    <div className="apoitments-empty col-12  d-flex py-2 flex-column align-items-center justify-content-center">
                                        <p className="calendar-icon"><i className="fas fa-calendar-alt "></i></p>
                                        <h4>Not implemented yet</h4>
                                        <p className="fw-bold">Choose a doctor and make appointment now!</p>
                                        <Link to="/appointment" className="btn btn-primary">Appointment</Link>
                                    </div>

                                }
                            </div>
                        }
                    </div>
                    {showConfirm && <ConfirmToast
                        asModal='true'
                        className='custom-confirm-toast-theme'
                        position='top-center'
                        buttonNoText='No'
                        buttonYesText='Yes'
                        customFunction={() => unlikeHandle(removeData)}
                        setShowConfirmToast={setShowConfirm}
                        showConfirmToast={showConfirm}
                        // theme='light'
                        toastText='Are you sure?'
                    />
                    }
                </div>
                {<ContactInfo data={personData} />}
            </div>
            }
        </>
    )
}