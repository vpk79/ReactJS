import Footer from "../Main/Footer";
import Topbar from "../Main/Topbar";
import AppointmentHeader from "./AppointmentHeader";

export default function AppointmentPage() {
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
                                <a href="/appointment" className="dropdown-item active">
                                    Appointment
                                </a>
                                <a href="/testimonial" className="dropdown-item">
                                    Testimonial
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
                <AppointmentHeader />
            {/* Page Header End */}

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
                                <form>
                                    <div className="row g-3">
                                        <div className="col-12 col-sm-6">
                                            <input
                                                type="text"
                                                className="form-control border-0"
                                                placeholder="Your Name"
                                                style={{ height: 55 }}
                                            />
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <input
                                                type="email"
                                                className="form-control border-0"
                                                placeholder="Your Email"
                                                style={{ height: 55 }}
                                            />
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <input
                                                type="text"
                                                className="form-control border-0"
                                                placeholder="Your Mobile"
                                                style={{ height: 55 }}
                                            />
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <select
                                                className="form-select border-0"
                                                style={{ height: 55 }}
                                            >
                                                <option selected="">Choose Doctor</option>
                                                <option value={1}>Doctor 1</option>
                                                <option value={2}>Doctor 2</option>
                                                <option value={3}>Doctor 3</option>
                                            </select>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="date" id="date" data-target-input="nearest">
                                                <input
                                                    type="text"
                                                    className="form-control border-0 datetimepicker-input"
                                                    placeholder="Choose Date"
                                                    data-target="#date"
                                                    data-toggle="datetimepicker"
                                                    style={{ height: 55 }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="time" id="time" data-target-input="nearest">
                                                <input
                                                    type="text"
                                                    className="form-control border-0 datetimepicker-input"
                                                    placeholder="Choose Date"
                                                    data-target="#time"
                                                    data-toggle="datetimepicker"
                                                    style={{ height: 55 }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <textarea
                                                className="form-control border-0"
                                                rows={5}
                                                placeholder="Describe your problem"
                                                defaultValue={""}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <button className="btn btn-primary w-100 py-3" type="submit">
                                                Book Appointment
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Appointment End */}
            {/* Footer Start */}
                <Footer />
            {/* Footer End */}
        </>



    )
}