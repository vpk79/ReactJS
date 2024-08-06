import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../contexts/authContext";
import useForm from "../../hooks/useForm";
import '@eonasdan/tempus-dominus/dist/css/tempus-dominus.css';

import { TempusDominus, version } from '@eonasdan/tempus-dominus';
import { EMPLOYERS } from "../../const/const";
import * as request from "../../lib/request";
import { showErrorToast } from "../../Toasts/toastsMsg";
import { Link } from "react-router-dom";

const AppoitmentFormKeys = {
    Name: 'Name',
    LastName: 'LastName',
    Phone: 'Phone',
    Date: 'Date',
    Email: 'Email',
    Description: 'Descritpion',
    Departments: 'Departments',
    Doctor: 'Doctor'
}

export default function Appointment() {

    const { isAuthenticated, appointmentSubmitHandler, username, lastname, phone, email } = useContext(AuthContext);


    const intialValues = {
        [AppoitmentFormKeys.Name]: username || '',
        [AppoitmentFormKeys.LastName]: lastname || '',
        [AppoitmentFormKeys.Phone]: phone || '',
        [AppoitmentFormKeys.Date]: '',
        [AppoitmentFormKeys.Email]: email || '',
        [AppoitmentFormKeys.Description]: '',
        [AppoitmentFormKeys.Departments]: '',
        [AppoitmentFormKeys.Doctor]: ''

    };

    const { values, onChange, onSubmit, setValues } = useForm(appointmentSubmitHandler, intialValues);
    const [employers, setEmployers] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [doctors, setDoctors] = useState('');
    const dateTimePickerRef = useRef(null);




    useEffect(() => {
        request.get(EMPLOYERS)
            .then(data => {
                setEmployers(data);
                let specials = [];
                for (const item of data) {
                    // console.log(item['department']);
                    specials.push(item['department'])
                }
                setDepartments(specials);
            })
            .catch(err => {
                console.log(err.message);
                showErrorToast(err.message, { toastId: 'requestError' })
            });
    }, []);

    useEffect(() => {
        // console.log(values.Departments);
        if (values.Departments === 'Choose Specialist') {
            setDoctors(employers);
        } else {
            const data = employers.filter(x => x.department === values.Departments);
            setDoctors(data);
        }

    }, [values])



    useEffect(() => {
        if (dateTimePickerRef.current) {
            new TempusDominus(dateTimePickerRef.current, {
                display: {
                    icons: {
                        type: 'icons',
                        time: 'fas fa-clock',
                        date: 'fas fa-calendar',
                        up: 'fas fa-arrow-up',
                        down: 'fas fa-arrow-down',
                        previous: 'fas fa-chevron-left',
                        next: 'fas fa-chevron-right',
                        today: 'fas fa-calendar-check',
                        clear: 'fas fa-trash',
                        close: 'fas fa-xmark'
                    },
                    sideBySide: false,
                    calendarWeeks: false,
                    viewMode: 'calendar',
                    toolbarPlacement: 'bottom',
                    keepOpen: false,
                    buttons: {
                        today: false,
                        clear: false,
                        close: false
                    },
                    components: {
                        calendar: true,
                        date: true,
                        month: true,
                        year: true,
                        decades: true,
                        clock: true,
                        hours: true,
                        minutes: true,
                        seconds: false,
                        //deprecated use localization.hourCycle = 'h24' instead
                        useTwentyfourHour: undefined
                    },
                    inline: false,
                    theme: 'auto'
                }
            });

            dateTimePickerRef.current.addEventListener('change.td', (event) => {
                const { date } = event.detail; // Вземете новата дата от събитието
                event.target.value = date;
                event.target.name = 'Date';
                onChange(event);
            });
        }
        return () => {
            if (dateTimePickerRef.current) {
                dateTimePickerRef.current.removeEventListener('change.td', () => { });
            }
        };

    }, []);


    return (
        <>
            {/* Appointment Start */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                            <p className="d-inline-block border rounded-pill py-1 px-4">
                                Appointment
                            </p>
                            <h1 className="mb-4">Make An Appointment To Visit Our Doctor</h1>
                            <p className="mb-4">
                                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
                                diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet
                                lorem sit clita duo justo magna dolore erat amet
                            </p>
                            <div className="bg-light rounded d-flex align-items-center p-5 mb-4">
                                <div
                                    className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-white"
                                    style={{ width: 55, height: 55 }}
                                >
                                    <i className="fa fa-phone-alt text-primary" />
                                </div>
                                <div className="ms-4">
                                    <p className="mb-2">Call Us Now</p>
                                    <h5 className="mb-0">+012 345 6789</h5>
                                </div>
                            </div>
                            <div className="bg-light rounded d-flex align-items-center p-5">
                                <div
                                    className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-white"
                                    style={{ width: 55, height: 55 }}
                                >
                                    <i className="fa fa-envelope-open text-primary" />
                                </div>
                                <div className="ms-4">
                                    <p className="mb-2">Mail Us Now</p>
                                    <h5 className="mb-0">info@example.com</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="bg-light rounded h-100 d-flex align-items-center p-5">
                                <form onSubmit={onSubmit} id="appointmentForm">
                                    {/* <div className="col-12 col-sm-6">
                                        <div className="time" id="time" data-target-input="nearest">
                                            <input
                                                type="datetime-local"
                                                className="form-control border-0 "
                                                placeholder="Choose Date"
                                                style={{ height: 55, fontSize: '1.2rem' }}
                                            />
                                        </div>
                                    </div> */}
                                    <div className="row g-3">
                                        <div className="col-12 col-sm-6">
                                            <input
                                                type="text"
                                                className="form-control border-0"
                                                placeholder="Your Name"
                                                style={{ height: 55 }}
                                                name={AppoitmentFormKeys.Name}
                                                value={values[AppoitmentFormKeys.Name]}
                                                onChange={onChange}
                                                disabled={!isAuthenticated}
                                            />
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <input
                                                type="text"
                                                className="form-control border-0"
                                                placeholder="Your Last Name"
                                                style={{ height: 55 }}
                                                name={AppoitmentFormKeys.LastName}
                                                value={values[AppoitmentFormKeys.LastName]}
                                                onChange={onChange}
                                                disabled={!isAuthenticated}
                                            />
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <input
                                                type="email"
                                                className="form-control border-0"
                                                placeholder="Your Email"
                                                style={{ height: 55 }}
                                                name={AppoitmentFormKeys.Email}
                                                value={values[AppoitmentFormKeys.Email]}
                                                onChange={onChange}
                                                disabled={!isAuthenticated}
                                            />
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <input
                                                type="text"
                                                className="form-control border-0"
                                                placeholder="Your Mobile"
                                                style={{ height: 55 }}
                                                name={AppoitmentFormKeys.Phone}
                                                value={values[AppoitmentFormKeys.Phone]}
                                                onChange={onChange}
                                                disabled={!isAuthenticated}
                                            />
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <select
                                                className="form-select border-0"
                                                style={{ height: 55 }}
                                                name={AppoitmentFormKeys.Departments}
                                                value={values[AppoitmentFormKeys.Departments]}
                                                onChange={onChange}
                                                disabled={!isAuthenticated}
                                            >
                                                <option>Choose Specialist</option>
                                                {departments.length > 0 && departments.map((data, index) =>
                                                    <option value={data} key={index}>{data}</option>
                                                )}
                                            </select>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <select
                                                className="form-select border-0"
                                                style={{ height: 55 }}
                                                name={AppoitmentFormKeys.Doctor}
                                                value={values[AppoitmentFormKeys.Doctor]}
                                                onChange={onChange}
                                                disabled={!isAuthenticated}
                                            >
                                                <option>Choose Doctor</option>
                                                {doctors.length > 0 && doctors.map((data, index) =>
                                                    <option value={data.name} key={index}>Dr.&nbsp;{data.name}
                                                    </option>
                                                )}
                                            </select>
                                        </div>


                                        <div className="container col-12">

                                            <div
                                                className="input-group"
                                                id="datetimepicker1"
                                                ref={dateTimePickerRef}
                                                data-td-target-input="nearest"
                                                data-td-target-toggle="nearest"
                                            >
                                                <input
                                                    id="datetimepicker1Input"
                                                    type="text"
                                                    placeholder="Choose Date"
                                                    className="form-control border-0"
                                                    data-td-target="#datetimepicker1"
                                                    style={{ height: 55 }}
                                                    name={AppoitmentFormKeys.Date}
                                                    disabled={!isAuthenticated}

                                                />
                                                <span
                                                    className="input-group-text"
                                                    data-td-target="#datetimepicker1"
                                                    data-td-toggle="datetimepicker"
                                                >
                                                    <span className="fas fa-calendar"></span>
                                                </span>
                                            </div>

                                        </div>
                                        <div className="col-12">
                                            <textarea
                                            id="textAreaAppointment"
                                                className="form-control border-0"
                                                rows={5}
                                                placeholder="Describe your problem"
                                                name={AppoitmentFormKeys.Description}
                                                value={values[AppoitmentFormKeys.Description]}
                                                onChange={onChange}
                                                disabled={!isAuthenticated}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <button className="btn btn-primary w-100 py-3" type="submit" disabled={!isAuthenticated}>
                                                Book Appointment
                                            </button>
                                        </div>
                                        {isAuthenticated && <p><i className="text-primary fs-4 fas fa-info-circle"></i> You can check your apointments in your <Link to="/userProfile">profile</Link>.</p>}
                                        {!isAuthenticated && <p className="my-4"> To use this form you must&nbsp; <span>
                                            <button
                                                className="btn btn-primary btn-sm" data-bs-toggle="modal"
                                                data-bs-target="#Login">Login</button></span>&nbsp;or
                                            &nbsp;<span>
                                                <button
                                                    className="btn btn-primary btn-sm" data-bs-toggle="modal"
                                                    data-bs-target="#Register">Register</button></span></p>}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Appointment End */}
        </>
    )
}