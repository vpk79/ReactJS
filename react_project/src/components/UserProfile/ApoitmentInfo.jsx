import { useEffect, useState } from "react";


export default function AppointmentInfo({ employerData, toggleShowInfo, userData, appointmentData }) {
    const data = employerData[0];
    const date = new Date(appointmentData.Date).toLocaleString();;
    console.log(date);
    const targetDate = new Date(date).getTime();
    const dayOfWeek = new Date(date).getDay();
    const [timeRemaining, setTimeRemaining] = useState(targetDate - Date.now());
    const [fullDate, fullHour] = date.split(', ');
    const [month, day, year] = fullDate.split('/');

    const getMonth = (value) => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[value];
    }
    const getDayOfWeek = (value) => {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return daysOfWeek[value];
    }


        useEffect(() => {
            const updateRemainingTime = () => {
                const currentTime = Date.now();
                const timeLeft = targetDate - currentTime;
                setTimeRemaining(timeLeft);
            };
            const intervalId = setInterval(updateRemainingTime, 1000);
            return () => clearInterval(intervalId);
        }, [targetDate]);

        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;

        return (
            <>
                <div className="col-12 d-flex py-2 flex-column align-items-center justify-content-center">
                    <div className="row col-12">
                        <div className="col-2 border py-2">
                            <button onClick={toggleShowInfo} className="btn btn-secondary btn-sm backBtn">
                                <i className="fas fa-times"></i></button>
                            <p className="fs-1 my-0 btn calendarBtn"><i className="far fa-calendar-alt"></i></p>
                            <p className="py-0 fw-bold">Change date</p>
                        </div>
                        <div className="col-4 border py-2 d-flex flex-column justify-content-center">
                            <p className="my-2">Appoitment date:</p>
                            <h6>{getDayOfWeek(dayOfWeek)}, {day} {getMonth(month)} {year}, {fullHour}</h6>

                        </div >
                        <div className="col-6 border d-flex justify-content-between py-2">
                            <div className="d-flex flex-column justify-content-center">
                                <p className="my-2">Time remaining:</p>
                                {timeRemaining > 0 ? (
                                    <div>
                                        <h6>{days} days {hours}:{minutes}:{seconds} h</h6>
                                    </div>
                                ) : (
                                    <div><h6 style={{ color: 'red' }}>Appointment time passed!</h6></div>
                                )}
                            </div>
                            <div>
                                <button className="btn btn-sm btn-secondary btnCancel">Cancel Appointment</button>
                            </div>
                        </div>
                    </div>
                    <div className="row col-12">
                        <div className="col-2 border d-flex flex-column justify-content-center align-items-center">
                            <img
                                src={data.imageUrl} alt=""
                                className="img-fluid  p-2 mx-auto"
                            ></img>
                            <button className="btn btn-primary btn-sm my-0 mb-2 more-info-btn">More info</button>
                        </div>
                        <div className="col-4 border d-flex flex-column justify-content-center align-items-center">
                            <h6>Dr. {data.name}</h6>
                            <h6>{data.department}</h6>
                        </div >
                        <div className="col-6 border">
                            <div>
                                <p className="my-1 text-decoration-underline">Cabinet:</p>
                                <h6>str. Tzar Ivan Shishman 81, fl.1</h6>
                            </div>
                            <div className="">
                                <p className="my-1 text-decoration-underline">Working time:</p>
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
            </>
        )
    }