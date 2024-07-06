export default function TeamPage(){
    return(
        <>
            <>
                {/* Topbar Start */}
                <div
                    className="container-fluid bg-light p-0 wow fadeIn"
                    data-wow-delay="0.1s"
                >
                    <div className="row gx-0 d-none d-lg-flex">
                        <div className="col-lg-7 px-5 text-start">
                            <div className="h-100 d-inline-flex align-items-center py-3 me-4">
                                <small className="fa fa-map-marker-alt text-primary me-2" />
                                <small>123 Street, New York, USA</small>
                            </div>
                            <div className="h-100 d-inline-flex align-items-center py-3">
                                <small className="far fa-clock text-primary me-2" />
                                <small>Mon - Fri : 09.00 AM - 09.00 PM</small>
                            </div>
                        </div>
                        <div className="col-lg-5 px-5 text-end">
                            <div className="h-100 d-inline-flex align-items-center py-3 me-4">
                                <small className="fa fa-phone-alt text-primary me-2" />
                                <small>+012 345 6789</small>
                            </div>
                            <div className="h-100 d-inline-flex align-items-center">
                                <a
                                    className="btn btn-sm-square rounded-circle bg-white text-primary me-1"
                                    href=""
                                >
                                    <i className="fab fa-facebook-f" />
                                </a>
                                <a
                                    className="btn btn-sm-square rounded-circle bg-white text-primary me-1"
                                    href=""
                                >
                                    <i className="fab fa-twitter" />
                                </a>
                                <a
                                    className="btn btn-sm-square rounded-circle bg-white text-primary me-1"
                                    href=""
                                >
                                    <i className="fab fa-linkedin-in" />
                                </a>
                                <a
                                    className="btn btn-sm-square rounded-circle bg-white text-primary me-0"
                                    href=""
                                >
                                    <i className="fab fa-instagram" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Topbar End */}
                {/* Navbar Start */}
                <nav
                    className="navbar navbar-expand-lg bg-white navbar-light sticky-top p-0 wow fadeIn"
                    data-wow-delay="0.1s"
                >
                    <a
                        href="index.html"
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
                            <a href="index.html" className="nav-item nav-link">
                                Home
                            </a>
                            <a href="about.html" className="nav-item nav-link">
                                About
                            </a>
                            <a href="service.html" className="nav-item nav-link">
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
                                    <a href="team.html" className="dropdown-item active">
                                        Our Doctor
                                    </a>
                                    <a href="appointment.html" className="dropdown-item">
                                        Appointment
                                    </a>
                                    <a href="testimonial.html" className="dropdown-item">
                                        Testimonial
                                    </a>
                                    <a href="404.html" className="dropdown-item">
                                        404 Page
                                    </a>
                                </div>
                            </div>
                            <a href="contact.html" className="nav-item nav-link">
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
                <div
                    className="container-fluid page-header py-5 mb-5 wow fadeIn"
                    data-wow-delay="0.1s"
                >
                    <div className="container py-5">
                        <h1 className="display-3 text-white mb-3 animated slideInDown">
                            Doctors
                        </h1>
                        <nav aria-label="breadcrumb animated slideInDown">
                            <ol className="breadcrumb text-uppercase mb-0">
                                <li className="breadcrumb-item">
                                    <a className="text-white" href="#">
                                        Home
                                    </a>
                                </li>
                                <li className="breadcrumb-item">
                                    <a className="text-white" href="#">
                                        Pages
                                    </a>
                                </li>
                                <li
                                    className="breadcrumb-item text-primary active"
                                    aria-current="page"
                                >
                                    Doctors
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>
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
                <div
                    className="container-fluid bg-dark text-light footer mt-5 pt-5 wow fadeIn"
                    data-wow-delay="0.1s"
                >
                    <div className="container py-5">
                        <div className="row g-5">
                            <div className="col-lg-3 col-md-6">
                                <h5 className="text-light mb-4">Address</h5>
                                <p className="mb-2">
                                    <i className="fa fa-map-marker-alt me-3" />
                                    123 Street, New York, USA
                                </p>
                                <p className="mb-2">
                                    <i className="fa fa-phone-alt me-3" />
                                    +012 345 67890
                                </p>
                                <p className="mb-2">
                                    <i className="fa fa-envelope me-3" />
                                    info@example.com
                                </p>
                                <div className="d-flex pt-2">
                                    <a
                                        className="btn btn-outline-light btn-social rounded-circle"
                                        href=""
                                    >
                                        <i className="fab fa-twitter" />
                                    </a>
                                    <a
                                        className="btn btn-outline-light btn-social rounded-circle"
                                        href=""
                                    >
                                        <i className="fab fa-facebook-f" />
                                    </a>
                                    <a
                                        className="btn btn-outline-light btn-social rounded-circle"
                                        href=""
                                    >
                                        <i className="fab fa-youtube" />
                                    </a>
                                    <a
                                        className="btn btn-outline-light btn-social rounded-circle"
                                        href=""
                                    >
                                        <i className="fab fa-linkedin-in" />
                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <h5 className="text-light mb-4">Services</h5>
                                <a className="btn btn-link" href="">
                                    Cardiology
                                </a>
                                <a className="btn btn-link" href="">
                                    Pulmonary
                                </a>
                                <a className="btn btn-link" href="">
                                    Neurology
                                </a>
                                <a className="btn btn-link" href="">
                                    Orthopedics
                                </a>
                                <a className="btn btn-link" href="">
                                    Laboratory
                                </a>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <h5 className="text-light mb-4">Quick Links</h5>
                                <a className="btn btn-link" href="">
                                    About Us
                                </a>
                                <a className="btn btn-link" href="">
                                    Contact Us
                                </a>
                                <a className="btn btn-link" href="">
                                    Our Services
                                </a>
                                <a className="btn btn-link" href="">
                                    Terms &amp; Condition
                                </a>
                                <a className="btn btn-link" href="">
                                    Support
                                </a>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <h5 className="text-light mb-4">Newsletter</h5>
                                <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
                                <div className="position-relative mx-auto" style={{ maxWidth: 400 }}>
                                    <input
                                        className="form-control border-0 w-100 py-3 ps-4 pe-5"
                                        type="text"
                                        placeholder="Your email"
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2"
                                    >
                                        SignUp
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="copyright">
                            <div className="row">
                                <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                                    ©{" "}
                                    <a className="border-bottom" href="#">
                                        Your Site Name
                                    </a>
                                    , All Right Reserved.
                                </div>
                                <div className="col-md-6 text-center text-md-end">
                                    {/*/*** This template is free as long as you keep the footer author’s credit link/attribution link/backlink. If you'd like to use the template without the footer author’s credit link/attribution link/backlink, you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". Thank you for your support. *** /*/}
                                    Designed By{" "}
                                    <a className="border-bottom" href="https://htmlcodex.com">
                                        HTML Codex
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Footer End */}
            </>

        </>
    )
}