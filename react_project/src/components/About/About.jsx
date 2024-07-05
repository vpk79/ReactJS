export default function About() {
    return (
        <>
            <div>
                <div
                    className="container-fluid bg-light p-0 wow fadeIn"
                    data-wow-delay="0.1s"
                >
                    <div className="row gx-0 d-none d-lg-flex">
                        <div className="col-lg-7 px-5 text-start">
                            <div className="h-100 d-inline-flex align-items-center py-3 me-4">
                                <small className="fa fa-map-marker-alt text-primary me-2" />
                                <small>
                                    123 Street, New York, USA
                                </small>
                            </div>
                            <div className="h-100 d-inline-flex align-items-center py-3">
                                <small className="far fa-clock text-primary me-2" />
                                <small>
                                    Mon - Fri : 09.00 AM - 09.00 PM
                                </small>
                            </div>
                        </div>
                        <div className="col-lg-5 px-5 text-end">
                            <div className="h-100 d-inline-flex align-items-center py-3 me-4">
                                <small className="fa fa-phone-alt text-primary me-2" />
                                <small>
                                    +012 345 6789
                                </small>
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
                <nav
                    className="navbar navbar-expand-lg bg-white navbar-light sticky-top p-0 wow fadeIn"
                    data-wow-delay="0.1s"
                >
                    <a
                        className="navbar-brand d-flex align-items-center px-4 px-lg-5"
                        href="index.html"
                    >
                        <h1 className="m-0 text-primary">
                            <i className="far fa-hospital me-3" />
                            Klinik
                        </h1>
                    </a>
                    <button
                        className="navbar-toggler me-4"
                        data-bs-target="#navbarCollapse"
                        data-bs-toggle="collapse"
                        type="button"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarCollapse"
                    >
                        <div className="navbar-nav ms-auto p-4 p-lg-0">
                            <a
                                className="nav-item nav-link"
                                href="index.html"
                            >
                                Home
                            </a>
                            <a
                                className="nav-item nav-link active"
                                href="about.html"
                            >
                                About
                            </a>
                            <a
                                className="nav-item nav-link"
                                href="service.html"
                            >
                                Service
                            </a>
                            <div className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                    href="#"
                                >
                                    Pages
                                </a>
                                <div className="dropdown-menu rounded-0 rounded-bottom m-0">
                                    <a
                                        className="dropdown-item"
                                        href="feature.html"
                                    >
                                        Feature
                                    </a>
                                    <a
                                        className="dropdown-item"
                                        href="team.html"
                                    >
                                        Our Doctor
                                    </a>
                                    <a
                                        className="dropdown-item"
                                        href="appointment.html"
                                    >
                                        Appointment
                                    </a>
                                    <a
                                        className="dropdown-item"
                                        href="testimonial.html"
                                    >
                                        Testimonial
                                    </a>
                                    <a
                                        className="dropdown-item"
                                        href="404.html"
                                    >
                                        404 Page
                                    </a>
                                </div>
                            </div>
                            <a
                                className="nav-item nav-link"
                                href="contact.html"
                            >
                                Contact
                            </a>
                        </div>
                        <a
                            className="btn btn-primary rounded-0 py-4 px-lg-5 d-none d-lg-block"
                            href=""
                        >
                            Appointment
                            <i className="fa fa-arrow-right ms-3" />
                        </a>
                    </div>
                </nav>
                <div
                    className="container-fluid page-header py-5 mb-5 wow fadeIn"
                    data-wow-delay="0.1s"
                >
                    <div className="container py-5">
                        <h1 className="display-3 text-white mb-3 animated slideInDown">
                            About Us
                        </h1>
                        <nav aria-label="breadcrumb animated slideInDown">
                            <ol className="breadcrumb text-uppercase mb-0">
                                <li className="breadcrumb-item">
                                    <a
                                        className="text-white"
                                        href="#"
                                    >
                                        Home
                                    </a>
                                </li>
                                <li className="breadcrumb-item">
                                    <a
                                        className="text-white"
                                        href="#"
                                    >
                                        Pages
                                    </a>
                                </li>
                                <li
                                    aria-current="page"
                                    className="breadcrumb-item text-primary active"
                                >
                                    About
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className="container-xxl py-5">
                    <div className="container">
                        <div className="row g-5">
                            <div
                                className="col-lg-6 wow fadeIn"
                                data-wow-delay="0.1s"
                            >
                                <div className="d-flex flex-column">
                                    <img
                                        alt=""
                                        className="img-fluid rounded w-75 align-self-end"
                                        src="img/about-1.jpg"
                                    />
                                    <img
                                        alt=""
                                        className="img-fluid rounded w-50 bg-white pt-3 pe-3"
                                        src="img/about-2.jpg"
                                        style={{
                                            marginTop: '-25%'
                                        }}
                                    />
                                </div>
                            </div>
                            <div
                                className="col-lg-6 wow fadeIn"
                                data-wow-delay="0.5s"
                            >
                                <p className="d-inline-block border rounded-pill py-1 px-4">
                                    About Us
                                </p>
                                <h1 className="mb-4">
                                    Why You Should Trust Us? Get Know About Us!
                                </h1>
                                <p>
                                    Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet
                                </p>
                                <p className="mb-4">
                                    Stet no et lorem dolor et diam, amet duo ut dolore vero eos. No stet est diam rebum amet diam ipsum. Clita clita labore, dolor duo nonumy clita sit at, sed sit sanctus dolor eos.
                                </p>
                                <p>
                                    <i className="far fa-check-circle text-primary me-3" />
                                    Quality health care
                                </p>
                                <p>
                                    <i className="far fa-check-circle text-primary me-3" />
                                    Only Qualified Doctors
                                </p>
                                <p>
                                    <i className="far fa-check-circle text-primary me-3" />
                                    Medical Research Professionals
                                </p>
                                <a
                                    className="btn btn-primary rounded-pill py-3 px-5 mt-3"
                                    href=""
                                >
                                    Read More
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid bg-primary overflow-hidden my-5 px-lg-0">
                    <div className="container feature px-lg-0">
                        <div className="row g-0 mx-lg-0">
                            <div
                                className="col-lg-6 feature-text py-5 wow fadeIn"
                                data-wow-delay="0.1s"
                            >
                                <div className="p-lg-5 ps-lg-0">
                                    <p className="d-inline-block border rounded-pill text-light py-1 px-4">
                                        Features
                                    </p>
                                    <h1 className="text-white mb-4">
                                        Why Choose Us
                                    </h1>
                                    <p className="text-white mb-4 pb-2">
                                        Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo erat amet
                                    </p>
                                    <div className="row g-4">
                                        <div className="col-6">
                                            <div className="d-flex align-items-center">
                                                <div
                                                    className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-light"
                                                    style={{
                                                        height: '55px',
                                                        width: '55px'
                                                    }}
                                                >
                                                    <i className="fa fa-user-md text-primary" />
                                                </div>
                                                <div className="ms-4">
                                                    <p className="text-white mb-2">
                                                        Experience
                                                    </p>
                                                    <h5 className="text-white mb-0">
                                                        Doctors
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="d-flex align-items-center">
                                                <div
                                                    className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-light"
                                                    style={{
                                                        height: '55px',
                                                        width: '55px'
                                                    }}
                                                >
                                                    <i className="fa fa-check text-primary" />
                                                </div>
                                                <div className="ms-4">
                                                    <p className="text-white mb-2">
                                                        Quality
                                                    </p>
                                                    <h5 className="text-white mb-0">
                                                        Services
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="d-flex align-items-center">
                                                <div
                                                    className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-light"
                                                    style={{
                                                        height: '55px',
                                                        width: '55px'
                                                    }}
                                                >
                                                    <i className="fa fa-comment-medical text-primary" />
                                                </div>
                                                <div className="ms-4">
                                                    <p className="text-white mb-2">
                                                        Positive
                                                    </p>
                                                    <h5 className="text-white mb-0">
                                                        Consultation
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="d-flex align-items-center">
                                                <div
                                                    className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-light"
                                                    style={{
                                                        height: '55px',
                                                        width: '55px'
                                                    }}
                                                >
                                                    <i className="fa fa-headphones text-primary" />
                                                </div>
                                                <div className="ms-4">
                                                    <p className="text-white mb-2">
                                                        24 Hours
                                                    </p>
                                                    <h5 className="text-white mb-0">
                                                        Support
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="col-lg-6 pe-lg-0 wow fadeIn"
                                data-wow-delay="0.5s"
                                style={{
                                    minHeight: '400px'
                                }}
                            >
                                <div className="position-relative h-100">
                                    <img
                                        alt=""
                                        className="position-absolute img-fluid w-100 h-100"
                                        src="img/feature.jpg"
                                        style={{
                                            objectFit: 'cover'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-xxl py-5">
                    <div className="container">
                        <div
                            className="text-center mx-auto mb-5 wow fadeInUp"
                            data-wow-delay="0.1s"
                            style={{
                                maxWidth: '600px'
                            }}
                        >
                            <p className="d-inline-block border rounded-pill py-1 px-4">
                                Doctors
                            </p>
                            <h1>
                                Our Experience Doctors
                            </h1>
                        </div>
                        <div className="row g-4">
                            <div
                                className="col-lg-3 col-md-6 wow fadeInUp"
                                data-wow-delay="0.1s"
                            >
                                <div className="team-item position-relative rounded overflow-hidden">
                                    <div className="overflow-hidden">
                                        <img
                                            alt=""
                                            className="img-fluid"
                                            src="img/team-1.jpg"
                                        />
                                    </div>
                                    <div className="team-text bg-light text-center p-4">
                                        <h5>
                                            Doctor Name
                                        </h5>
                                        <p className="text-primary">
                                            Department
                                        </p>
                                        <div className="team-social text-center">
                                            <a
                                                className="btn btn-square"
                                                href=""
                                            >
                                                <i className="fab fa-facebook-f" />
                                            </a>
                                            <a
                                                className="btn btn-square"
                                                href=""
                                            >
                                                <i className="fab fa-twitter" />
                                            </a>
                                            <a
                                                className="btn btn-square"
                                                href=""
                                            >
                                                <i className="fab fa-instagram" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="col-lg-3 col-md-6 wow fadeInUp"
                                data-wow-delay="0.3s"
                            >
                                <div className="team-item position-relative rounded overflow-hidden">
                                    <div className="overflow-hidden">
                                        <img
                                            alt=""
                                            className="img-fluid"
                                            src="img/team-2.jpg"
                                        />
                                    </div>
                                    <div className="team-text bg-light text-center p-4">
                                        <h5>
                                            Doctor Name
                                        </h5>
                                        <p className="text-primary">
                                            Department
                                        </p>
                                        <div className="team-social text-center">
                                            <a
                                                className="btn btn-square"
                                                href=""
                                            >
                                                <i className="fab fa-facebook-f" />
                                            </a>
                                            <a
                                                className="btn btn-square"
                                                href=""
                                            >
                                                <i className="fab fa-twitter" />
                                            </a>
                                            <a
                                                className="btn btn-square"
                                                href=""
                                            >
                                                <i className="fab fa-instagram" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="col-lg-3 col-md-6 wow fadeInUp"
                                data-wow-delay="0.5s"
                            >
                                <div className="team-item position-relative rounded overflow-hidden">
                                    <div className="overflow-hidden">
                                        <img
                                            alt=""
                                            className="img-fluid"
                                            src="img/team-3.jpg"
                                        />
                                    </div>
                                    <div className="team-text bg-light text-center p-4">
                                        <h5>
                                            Doctor Name
                                        </h5>
                                        <p className="text-primary">
                                            Department
                                        </p>
                                        <div className="team-social text-center">
                                            <a
                                                className="btn btn-square"
                                                href=""
                                            >
                                                <i className="fab fa-facebook-f" />
                                            </a>
                                            <a
                                                className="btn btn-square"
                                                href=""
                                            >
                                                <i className="fab fa-twitter" />
                                            </a>
                                            <a
                                                className="btn btn-square"
                                                href=""
                                            >
                                                <i className="fab fa-instagram" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="col-lg-3 col-md-6 wow fadeInUp"
                                data-wow-delay="0.7s"
                            >
                                <div className="team-item position-relative rounded overflow-hidden">
                                    <div className="overflow-hidden">
                                        <img
                                            alt=""
                                            className="img-fluid"
                                            src="img/team-4.jpg"
                                        />
                                    </div>
                                    <div className="team-text bg-light text-center p-4">
                                        <h5>
                                            Doctor Name
                                        </h5>
                                        <p className="text-primary">
                                            Department
                                        </p>
                                        <div className="team-social text-center">
                                            <a
                                                className="btn btn-square"
                                                href=""
                                            >
                                                <i className="fab fa-facebook-f" />
                                            </a>
                                            <a
                                                className="btn btn-square"
                                                href=""
                                            >
                                                <i className="fab fa-twitter" />
                                            </a>
                                            <a
                                                className="btn btn-square"
                                                href=""
                                            >
                                                <i className="fab fa-instagram" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="container-fluid bg-dark text-light footer mt-5 pt-5 wow fadeIn"
                    data-wow-delay="0.1s"
                >
                    <div className="container py-5">
                        <div className="row g-5">
                            <div className="col-lg-3 col-md-6">
                                <h5 className="text-light mb-4">
                                    Address
                                </h5>
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
                                <h5 className="text-light mb-4">
                                    Services
                                </h5>
                                <a
                                    className="btn btn-link"
                                    href=""
                                >
                                    Cardiology
                                </a>
                                <a
                                    className="btn btn-link"
                                    href=""
                                >
                                    Pulmonary
                                </a>
                                <a
                                    className="btn btn-link"
                                    href=""
                                >
                                    Neurology
                                </a>
                                <a
                                    className="btn btn-link"
                                    href=""
                                >
                                    Orthopedics
                                </a>
                                <a
                                    className="btn btn-link"
                                    href=""
                                >
                                    Laboratory
                                </a>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <h5 className="text-light mb-4">
                                    Quick Links
                                </h5>
                                <a
                                    className="btn btn-link"
                                    href=""
                                >
                                    About Us
                                </a>
                                <a
                                    className="btn btn-link"
                                    href=""
                                >
                                    Contact Us
                                </a>
                                <a
                                    className="btn btn-link"
                                    href=""
                                >
                                    Our Services
                                </a>
                                <a
                                    className="btn btn-link"
                                    href=""
                                >
                                    Terms & Condition
                                </a>
                                <a
                                    className="btn btn-link"
                                    href=""
                                >
                                    Support
                                </a>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <h5 className="text-light mb-4">
                                    Newsletter
                                </h5>
                                <p>
                                    Dolor amet sit justo amet elitr clita ipsum elitr est.
                                </p>
                                <div
                                    className="position-relative mx-auto"
                                    style={{
                                        maxWidth: '400px'
                                    }}
                                >
                                    <input
                                        className="form-control border-0 w-100 py-3 ps-4 pe-5"
                                        placeholder="Your email"
                                        type="text"
                                    />
                                    <button
                                        className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2"
                                        type="button"
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
                                    ©{' '}
                                    <a
                                        className="border-bottom"
                                        href="#"
                                    >
                                        Your Site Name
                                    </a>
                                    , All Right Reserved.
                                </div>
                                <div className="col-md-6 text-center text-md-end">
                                    Designed By{' '}
                                    <a
                                        className="border-bottom"
                                        href="https://htmlcodex.com"
                                    >
                                        HTML Codex
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}