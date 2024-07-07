import Footer from "../Main/Footer";
import Topbar from "../Main/Topbar";
import TeamHeader from "./TeamHeader";

export default function TeamPage(){
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
                            <a href="/service" className="nav-item nav-link">
                                Service
                            </a>
                            <div className="nav-item dropdown">
                                <a
                                    href="#"
                                    className="nav-link dropdown-toggle active"
                                    data-bs-toggle="dropdown"
                                >
                                    Pages
                                </a>
                                <div className="dropdown-menu rounded-0 rounded-bottom m-0">
                                    <a href="feature.html" className="dropdown-item">
                                        Feature
                                    </a>
                                    <a href="/team" className="dropdown-item active">
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
                            href="/appointment"
                            className="btn btn-primary rounded-0 py-4 px-lg-5 d-none d-lg-block"
                        >
                            Appointment
                            <i className="fa fa-arrow-right ms-3" />
                        </a>
                    </div>
                </nav>
                {/* Navbar End */}

                {/* Page Header Start */}
                    <TeamHeader />
                {/* Page Header End */}

                {/* Team Start */}
                <div className="container-xxl py-5">
                    <div className="container">
                        <div
                            className="text-center mx-auto mb-5 wow fadeInUp"
                            data-wow-delay="0.1s"
                            style={{ maxWidth: 600 }}
                        >
                            <p className="d-inline-block border rounded-pill py-1 px-4">Doctors</p>
                            <h1>Our Experience Doctors</h1>
                        </div>
                        <div className="row g-4">
                            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                <div className="team-item position-relative rounded overflow-hidden">
                                    <div className="overflow-hidden">
                                        <img className="img-fluid" src="img/team-1.jpg" alt="" />
                                    </div>
                                    <div className="team-text bg-light text-center p-4">
                                        <h5>Doctor Name</h5>
                                        <p className="text-primary">Department</p>
                                        <div className="team-social text-center">
                                            <a className="btn btn-square" href="">
                                                <i className="fab fa-facebook-f" />
                                            </a>
                                            <a className="btn btn-square" href="">
                                                <i className="fab fa-twitter" />
                                            </a>
                                            <a className="btn btn-square" href="">
                                                <i className="fab fa-instagram" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                                <div className="team-item position-relative rounded overflow-hidden">
                                    <div className="overflow-hidden">
                                        <img className="img-fluid" src="img/team-2.jpg" alt="" />
                                    </div>
                                    <div className="team-text bg-light text-center p-4">
                                        <h5>Doctor Name</h5>
                                        <p className="text-primary">Department</p>
                                        <div className="team-social text-center">
                                            <a className="btn btn-square" href="">
                                                <i className="fab fa-facebook-f" />
                                            </a>
                                            <a className="btn btn-square" href="">
                                                <i className="fab fa-twitter" />
                                            </a>
                                            <a className="btn btn-square" href="">
                                                <i className="fab fa-instagram" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                                <div className="team-item position-relative rounded overflow-hidden">
                                    <div className="overflow-hidden">
                                        <img className="img-fluid" src="img/team-3.jpg" alt="" />
                                    </div>
                                    <div className="team-text bg-light text-center p-4">
                                        <h5>Doctor Name</h5>
                                        <p className="text-primary">Department</p>
                                        <div className="team-social text-center">
                                            <a className="btn btn-square" href="">
                                                <i className="fab fa-facebook-f" />
                                            </a>
                                            <a className="btn btn-square" href="">
                                                <i className="fab fa-twitter" />
                                            </a>
                                            <a className="btn btn-square" href="">
                                                <i className="fab fa-instagram" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
                                <div className="team-item position-relative rounded overflow-hidden">
                                    <div className="overflow-hidden">
                                        <img className="img-fluid" src="img/team-4.jpg" alt="" />
                                    </div>
                                    <div className="team-text bg-light text-center p-4">
                                        <h5>Doctor Name</h5>
                                        <p className="text-primary">Department</p>
                                        <div className="team-social text-center">
                                            <a className="btn btn-square" href="">
                                                <i className="fab fa-facebook-f" />
                                            </a>
                                            <a className="btn btn-square" href="">
                                                <i className="fab fa-twitter" />
                                            </a>
                                            <a className="btn btn-square" href="">
                                                <i className="fab fa-instagram" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                <div className="team-item position-relative rounded overflow-hidden">
                                    <div className="overflow-hidden">
                                        <img className="img-fluid" src="img/team-2.jpg" alt="" />
                                    </div>
                                    <div className="team-text bg-light text-center p-4">
                                        <h5>Doctor Name</h5>
                                        <p className="text-primary">Department</p>
                                        <div className="team-social text-center">
                                            <a className="btn btn-square" href="">
                                                <i className="fab fa-facebook-f" />
                                            </a>
                                            <a className="btn btn-square" href="">
                                                <i className="fab fa-twitter" />
                                            </a>
                                            <a className="btn btn-square" href="">
                                                <i className="fab fa-instagram" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                                <div className="team-item position-relative rounded overflow-hidden">
                                    <div className="overflow-hidden">
                                        <img className="img-fluid" src="img/team-3.jpg" alt="" />
                                    </div>
                                    <div className="team-text bg-light text-center p-4">
                                        <h5>Doctor Name</h5>
                                        <p className="text-primary">Department</p>
                                        <div className="team-social text-center">
                                            <a className="btn btn-square" href="">
                                                <i className="fab fa-facebook-f" />
                                            </a>
                                            <a className="btn btn-square" href="">
                                                <i className="fab fa-twitter" />
                                            </a>
                                            <a className="btn btn-square" href="">
                                                <i className="fab fa-instagram" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                                <div className="team-item position-relative rounded overflow-hidden">
                                    <div className="overflow-hidden">
                                        <img className="img-fluid" src="img/team-4.jpg" alt="" />
                                    </div>
                                    <div className="team-text bg-light text-center p-4">
                                        <h5>Doctor Name</h5>
                                        <p className="text-primary">Department</p>
                                        <div className="team-social text-center">
                                            <a className="btn btn-square" href="">
                                                <i className="fab fa-facebook-f" />
                                            </a>
                                            <a className="btn btn-square" href="">
                                                <i className="fab fa-twitter" />
                                            </a>
                                            <a className="btn btn-square" href="">
                                                <i className="fab fa-instagram" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
                                <div className="team-item position-relative rounded overflow-hidden">
                                    <div className="overflow-hidden">
                                        <img className="img-fluid" src="img/team-1.jpg" alt="" />
                                    </div>
                                    <div className="team-text bg-light text-center p-4">
                                        <h5>Doctor Name</h5>
                                        <p className="text-primary">Department</p>
                                        <div className="team-social text-center">
                                            <a className="btn btn-square" href="">
                                                <i className="fab fa-facebook-f" />
                                            </a>
                                            <a className="btn btn-square" href="">
                                                <i className="fab fa-twitter" />
                                            </a>
                                            <a className="btn btn-square" href="">
                                                <i className="fab fa-instagram" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Team End */}

                {/* Footer Start */}
                    <Footer />
                {/* Footer End */}
            </>

        </>
    )
}