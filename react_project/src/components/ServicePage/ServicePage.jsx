import { Link } from "react-router-dom";
import Appointment from "../Main/Appointment";
import Testemonial from "../Main/Testimonial";
import ServiceHeader from "./ServiceHeader";

export default function ServicePage(){
    return(
        <>
            <>
                {/* Page Header Start */}
                    {/* <ServiceHeader /> */}
                {/* Page Header End */}

                {/* Service Start */}
                <div className="container-xxl py-5">
                    <div className="container">
                        <div
                            className="text-center mx-auto mb-5 wow fadeInUp"
                            data-wow-delay="0.1s"
                            style={{ maxWidth: 600 }}
                        >
                            <p className="d-inline-block border rounded-pill py-1 px-4">Services</p>
                            <h1>Health Care Solutions</h1>
                        </div>
                        <div className="row g-4">
                            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                <div className="service-item bg-light rounded h-100 p-5">
                                    <div
                                        className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4"
                                        style={{ width: 65, height: 65 }}
                                    >
                                        <i className="fa fa-heartbeat text-primary fs-4" />
                                    </div>
                                    <h4 className="mb-3">Cardiology</h4>
                                    <p className="mb-4">
                                        Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem
                                        sed diam stet diam sed stet.
                                    </p>
                                    <Link to="" className="btn">
                                        <i className="fa fa-plus text-primary me-3" />
                                        Read More
                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                                <div className="service-item bg-light rounded h-100 p-5">
                                    <div
                                        className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4"
                                        style={{ width: 65, height: 65 }}
                                    >
                                        <i className="fa fa-x-ray text-primary fs-4" />
                                    </div>
                                    <h4 className="mb-3">Pulmonary</h4>
                                    <p className="mb-4">
                                        Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem
                                        sed diam stet diam sed stet.
                                    </p>
                                    <Link to="" className="btn">
                                        <i className="fa fa-plus text-primary me-3" />
                                        Read More
                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                                <div className="service-item bg-light rounded h-100 p-5">
                                    <div
                                        className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4"
                                        style={{ width: 65, height: 65 }}
                                    >
                                        <i className="fa fa-brain text-primary fs-4" />
                                    </div>
                                    <h4 className="mb-3">Neurology</h4>
                                    <p className="mb-4">
                                        Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem
                                        sed diam stet diam sed stet.
                                    </p>
                                    <Link to="" className="btn">
                                        <i className="fa fa-plus text-primary me-3" />
                                        Read More
                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                <div className="service-item bg-light rounded h-100 p-5">
                                    <div
                                        className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4"
                                        style={{ width: 65, height: 65 }}
                                    >
                                        <i className="fa fa-wheelchair text-primary fs-4" />
                                    </div>
                                    <h4 className="mb-3">Orthopedics</h4>
                                    <p className="mb-4">
                                        Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem
                                        sed diam stet diam sed stet.
                                    </p>
                                    <Link to="" className="btn">
                                        <i className="fa fa-plus text-primary me-3" />
                                        Read More
                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                                <div className="service-item bg-light rounded h-100 p-5">
                                    <div
                                        className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4"
                                        style={{ width: 65, height: 65 }}
                                    >
                                        <i className="fa fa-tooth text-primary fs-4" />
                                    </div>
                                    <h4 className="mb-3">Dental Surgery</h4>
                                    <p className="mb-4">
                                        Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem
                                        sed diam stet diam sed stet.
                                    </p>
                                    <Link to="" className="btn">
                                        <i className="fa fa-plus text-primary me-3" />
                                        Read More
                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                                <div className="service-item bg-light rounded h-100 p-5">
                                    <div
                                        className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4"
                                        style={{ width: 65, height: 65 }}
                                    >
                                        <i className="fa fa-vials text-primary fs-4" />
                                    </div>
                                    <h4 className="mb-3">Laboratory</h4>
                                    <p className="mb-4">
                                        Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem
                                        sed diam stet diam sed stet.
                                    </p>
                                    <Link to="" className="btn">
                                        <i className="fa fa-plus text-primary me-3" />
                                        Read More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Service End */}

                {/* Appointment Start */}
                    <Appointment />
                {/* Appointment End */}

                {/* Testimonial Start */}
                    <Testemonial />
                {/* Testimonial End */}

            </>

        </>
    )
}