import Footer from "./Footer";
import Topbar from "./Topbar";

export default function ErrorPage(){
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
                                    <a href="/feature" className="dropdown-item">
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
                                    <a href="/404" className="dropdown-item active">
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
                <div
                    className="container-fluid page-header py-5 mb-5 wow fadeIn"
                    data-wow-delay="0.1s"
                >
                    <div className="container py-5">
                        <h1 className="display-3 text-white mb-3 animated slideInDown">
                            404 Error
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
                                    404 Error
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>
                {/* Page Header End */}

                {/* 404 Start */}
                <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
                    <div className="container text-center">
                        <div className="row justify-content-center">
                            <div className="col-lg-6">
                                <i className="bi bi-exclamation-triangle display-1 text-primary" />
                                <h1 className="display-1">404</h1>
                                <h1 className="mb-4">Page Not Found</h1>
                                <p className="mb-4">
                                    We’re sorry, the page you have looked for does not exist in our
                                    website! Maybe go to our home page or try to use a search?
                                </p>
                                <a className="btn btn-primary rounded-pill py-3 px-5" href="">
                                    Go Back To Home
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 404 End */}

                {/* Footer Start */}
                    <Footer />
                {/* Footer End */}
            </>

        </>
    )
}