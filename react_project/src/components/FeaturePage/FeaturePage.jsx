import Footer from '../Main/Footer'
import Topbar from '../Main/Topbar'

export default function FeaturePage() {
    return (
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
                                <a href="/feature" className="dropdown-item active">
                                    Feature
                                </a>
                                <a href="/team" className="dropdown-item">
                                    Our Doctor
                                </a>
                                <a href="/appointment" className="dropdown-item">
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
            <div
                className="container-fluid page-header py-5 mb-5 wow fadeIn"
                data-wow-delay="0.1s"
            >
                <div className="container py-5">
                    <h1 className="display-3 text-white mb-3 animated slideInDown">
                        Feature
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
                                Feature
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
            {/* Page Header End */}


            {/* Feature Start */}
            <div
                className="container-fluid bg-primary overflow-hidden px-lg-0"
                style={{ margin: "6rem 0" }}
            >
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
                                <h1 className="text-white mb-4">Why Choose Us</h1>
                                <p className="text-white mb-4 pb-2">
                                    Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
                                    diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet
                                    lorem sit clita duo justo erat amet
                                </p>
                                <div className="row g-4">
                                    <div className="col-6">
                                        <div className="d-flex align-items-center">
                                            <div
                                                className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-light"
                                                style={{ width: 55, height: 55 }}
                                            >
                                                <i className="fa fa-user-md text-primary" />
                                            </div>
                                            <div className="ms-4">
                                                <p className="text-white mb-2">Experience</p>
                                                <h5 className="text-white mb-0">Doctors</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="d-flex align-items-center">
                                            <div
                                                className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-light"
                                                style={{ width: 55, height: 55 }}
                                            >
                                                <i className="fa fa-check text-primary" />
                                            </div>
                                            <div className="ms-4">
                                                <p className="text-white mb-2">Quality</p>
                                                <h5 className="text-white mb-0">Services</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="d-flex align-items-center">
                                            <div
                                                className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-light"
                                                style={{ width: 55, height: 55 }}
                                            >
                                                <i className="fa fa-comment-medical text-primary" />
                                            </div>
                                            <div className="ms-4">
                                                <p className="text-white mb-2">Positive</p>
                                                <h5 className="text-white mb-0">Consultation</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="d-flex align-items-center">
                                            <div
                                                className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-light"
                                                style={{ width: 55, height: 55 }}
                                            >
                                                <i className="fa fa-headphones text-primary" />
                                            </div>
                                            <div className="ms-4">
                                                <p className="text-white mb-2">24 Hours</p>
                                                <h5 className="text-white mb-0">Support</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="col-lg-6 pe-lg-0 wow fadeIn"
                            data-wow-delay="0.5s"
                            style={{ minHeight: 400 }}
                        >
                            <div className="position-relative h-100">
                                <img
                                    className="position-absolute img-fluid w-100 h-100"
                                    src="img/feature.jpg"
                                    style={{ objectFit: "cover" }}
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Feature End */}

            {/* Footer Start */}
            <Footer />
            {/* Footer End */}

        </>
    )
}