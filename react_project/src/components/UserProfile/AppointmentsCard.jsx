

export default function AppointmentsCard({ data, toggleShowInfo,  choosedAppointment }) {
    // console.log(data);
    const newdata = data.Date.split('T');
   
    // console.log(data.Date);
    // console.log(data);
    const [year, month, day] = newdata[0].split('-');
    const [hour, minutes, rest] = newdata[1].split(':');

    return (
        <>
            <div className="col-sm-3 calendar-wrapper" onClick={() => (toggleShowInfo(),  choosedAppointment(data))}>
                <img
                    src="/img/calendar_frame.png" alt=""
                    className="img-fluid bg-light p-2 mx-auto mb-4"
                ></img>
                <div className="date-wrapper d-flex flex-column align-items-center justify-content-center">
                    <p className="date-day my-0">{day}</p>
                    <p className="date-month my-0">{month}</p>
                    <p className="date-hour my-0">{hour}:{minutes} h</p>
                </div>
            </div>
        </>
    )
}