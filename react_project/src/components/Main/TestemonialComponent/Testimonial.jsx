import React, { useContext } from 'react';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import OwlCarousel from 'react-owl-carousel';
import { options } from './carousel';
import AuthContext from '../../../contexts/authContext';

export default function Testemonial() {
    const { isAuthenticated, email, username, profileImage } = useContext(AuthContext);



    return (
        <>
            {/* Testimonial Start */}
            <div className="container-xxl py-5">
                <div className="container d-flex flex-column align-items-center ">
                    <div
                        className="text-center mx-auto mb-5 wow fadeInUp"
                        data-wow-delay="0.1s"
                        style={{ maxWidth: 600 }}
                    >
                        <p className="d-inline-block border rounded-pill py-1 px-4">
                            Testimonial
                        </p>
                        <h1>What Say Our Patients!</h1>
                    </div>
                    <OwlCarousel className="owl-carousel testimonial-carousel wow fadeInUp owl-theme" {...options}>
                        <div className="testimonial-item text-center">
                            <img
                                className="img-fluid bg-light rounded-circle p-2 mx-auto mb-4"
                                src="img/testimonial-1.jpg"
                                alt="Patient 1"
                                style={{ width: 100, height: 100 }}
                            />
                            <div className="testimonial-text rounded text-center p-4">
                                <p>
                                    Clita clita tempor justo dolor ipsum amet kasd amet duo justo duo
                                    duo labore sed sed. Magna ut diam sit et amet stet eos sed clita
                                    erat magna elitr erat sit sit erat at rebum justo sea clita.
                                </p>
                                <h5 className="mb-1">Patient Name</h5>
                                <span className="fst-italic">Profession</span>
                            </div>
                        </div>
                        <div className="testimonial-item text-center">
                            <img
                                className="img-fluid bg-light rounded-circle p-2 mx-auto mb-4"
                                src="img/testimonial-2.jpg"
                                alt="Patient 2"
                                style={{ width: 100, height: 100 }}
                            />
                            <div className="testimonial-text rounded text-center p-4">
                                <p>
                                    Clita clita tempor justo dolor ipsum amet kasd amet duo justo duo
                                    duo labore sed sed. Magna ut diam sit et amet stet eos sed clita
                                    erat magna elitr erat sit sit erat at rebum justo sea clita.
                                </p>
                                <h5 className="mb-1">Patient Name</h5>
                                <span className="fst-italic">Profession</span>
                            </div>
                        </div>
                        <div className="testimonial-item text-center">
                            <img
                                className="img-fluid bg-light rounded-circle p-2 mx-auto mb-4"
                                src="img/testimonial-3.jpg"
                                alt="Patient 3"
                                style={{ width: 100, height: 100 }}
                            />
                            <div className="testimonial-text rounded text-center p-4">
                                <p>
                                    Clita clita tempor justo dolor ipsum amet kasd amet duo justo duo
                                    duo labore sed sed. Magna ut diam sit et amet stet eos сед clita
                                    erat magna elitr erat sit sit erat at rebum justo sea clita.
                                </p>
                                <h5 className="mb-1">Patient Name</h5>
                                <span className="fst-italic">Profession</span>
                            </div>
                        </div>
                    </OwlCarousel>
                    <div className='my-5'>
                        {isAuthenticated && <button className='btn btn-primary my-5' data-bs-toggle="modal" data-bs-target="#feedbackModal">Comment</button>}
                        {!isAuthenticated && <>
                            <h5>You must  <button className="btn btn-primary btn-sm" data-bs-toggle="modal"
                                data-bs-target="#Login">Login</button>
                                &nbsp;&nbsp;&nbsp;or&nbsp;&nbsp;&nbsp;
                                <button className="btn btn-primary btn-sm" data-bs-toggle="modal"
                                    data-bs-target="#Register">Register</button>&nbsp;&nbsp;to make a comment.</h5>
                        </>}
                    </div>
                </div>

            </div>
            {/* Testimonial End */}
        </>
    );
}