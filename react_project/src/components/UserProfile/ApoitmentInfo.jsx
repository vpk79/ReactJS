

export default function AppointmentInfo({ employerData, toggleShowInfo, userData }){
    const data = employerData[0];
    // console.log(employerData);
    return(
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
                            src={data.imageUrl} alt=""
                            className="img-fluid  p-2 mx-auto"
                        ></img>
                        <button className="btn btn-primary btn-sm my-0 mb-2 more-info-btn">More info</button>
                    </div>
                    <div className="col-4 border d-flex flex-column justify-content-center align-items-center">
                        <h6>Dr. {data.name}</h6>
                        <p>{data.department}</p>
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
        </>
    )
}