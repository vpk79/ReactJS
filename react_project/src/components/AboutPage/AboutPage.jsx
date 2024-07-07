import About from "../Main/About";
import Feature from "../Main/Feature";
import Footer from "../Main/Footer";
import Team from "../Main/Team";
import Topbar from "../Main/Topbar";
import AboutHeader from "./AboutHeader";

export default function AboutPage() {
    return (
        <>
            <>
              
               <Topbar />
                
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
                            <a href="/about" className="nav-item nav-link active">
                                About
                            </a>
                            <a href="/service" className="nav-item nav-link">
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
                                    <a href="/feature" className="dropdown-item">
                                        Feature
                                    </a>
                                    <a href="/team" className="dropdown-item">
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
                    <AboutHeader />
                {/* Page Header End */}

                {/* About Start */}
                    <About />
                {/* About End */}

                {/* Feature Start */}
                    <Feature />
                {/* Feature End */}

                {/* Team Start */}
                    <Team />
                {/* Team End */}

                {/* Footer Start */}
                    <Footer />
                {/* Footer End */}
            </>

        </>
    )
}