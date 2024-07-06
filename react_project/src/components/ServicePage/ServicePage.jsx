import Appointment from "../Main/Appointment";
import Footer from "../Main/Footer";
import Testemonial from "../Main/Testimonial";
import Topbar from "../Main/Topbar";
import ServiceHeader from "./ServiceHeader";

export default function ServicePage(){
    return(
        <>
            <>
                {/* Topbar Start */}
                    <Topbar />
                {/* Topbar End */}

                {/* Navbar Start */}
                <nav
                    className="navbar navbar-expand-lg bg-white navbar-light sticky-top p-0 wow fadeIn"
                    data-wow-delay="0.1s"
                >
                    <a
                        href="/"
                        className="navbar-brand d-flex align-items-center px-4 px-lg-5"
                    >
                        <h1 className="m-0 text-primary">
                            <i className="far fa-hospital me-3" />
                            Klinik
                        </h1>
                    </a>
                    <button
                        type="button"
                        className="navbar-toggler me-4"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav ms-auto p-4 p-lg-0">
                            <a href="/" className="nav-item nav-link">
                                Home
                            </a>
                            <a href="/about" className="nav-item nav-link">
                                About
                            </a>
                            <a href="/service" className="nav-item nav-link active">
                                Service
                            </a>
                            <div className="nav-item dropdown">
                                <a
                                    href="#"
                                    className="nav-link dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                >
                                    Pages
                                </a>
                                <div className="dropdown-menu rounded-0 rounded-bottom m-0">
                                    <a href="feature.html" className="dropdown-item">
                                        Feature
                                    </a>
                                    <a href="team.html" className="dropdown-item">
                                        Our Doctor
                                    </a>
                                    <a href="appointment.html" className="dropdown-item">
                                        Appointment
                                    </a>
                                    <a href="/testimonial" className="dropdown-item">
                                        Testimonial
                                    </a>
                                    <a href="404.html" className="dropdown-item">
                                        404 Page
                                    </a>
                                </div>
                            </div>
                            <a href="/contact" className="nav-item nav-link">
                                Contact
                            </a>
                        </div>
                        <a
                            href=""
                            className="btn btn-primary rounded-0 py-4 px-lg-5 d-none d-lg-block"
                        >
                            Appointment
                            <i className="fa fa-arrow-right ms-3" />
                        </a>
                    </div>
                </nav>
                {/* Navbar End */}

                {/* Page Header Start */}
                    <ServiceHeader />
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
                                    <a className="btn" href="">
                                        <i className="fa fa-plus text-primary me-3" />
                                        Read More
                                    </a>
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
                                    <a className="btn" href="">
                                        <i className="fa fa-plus text-primary me-3" />
                                        Read More
                                    </a>
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
                                    <a className="btn" href="">
                                        <i className="fa fa-plus text-primary me-3" />
                                        Read More
                                    </a>
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
                                    <a className="btn" href="">
                                        <i className="fa fa-plus text-primary me-3" />
                                        Read More
                                    </a>
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
                                    <a className="btn" href="">
                                        <i className="fa fa-plus text-primary me-3" />
                                        Read More
                                    </a>
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
                                    <a className="btn" href="">
                                        <i className="fa fa-plus text-primary me-3" />
                                        Read More
                                    </a>
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

                {/* Footer Start */}
                    <Footer />
                {/* Footer End */}
            </>

        </>
    )
}