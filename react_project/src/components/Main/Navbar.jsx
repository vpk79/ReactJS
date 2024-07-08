import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <>
            {/* Navbar Start */}
            <nav
                className="navbar navbar-expand-lg bg-white navbar-light sticky-top p-0 wow fadeIn"
                
                data-wow-delay="0.1s"
            >
                <Link to="/"
                    className="navbar-brand d-flex align-items-center px-4 px-lg-5"
                >
                    <h1 className="m-0 text-primary">
                        <i className="far fa-hospital me-3" />
                        Klinik
                    </h1>
                </Link>
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
                        <NavLink className={({ isActive }) => isActive ? "nav-item nav-link active" : "nav-item nav-link"} to="/">
                            Home
                        </NavLink>
                        <NavLink className={({ isActive }) => isActive ? "nav-item nav-link active" : "nav-item nav-link"} to="/about">
                            About
                        </NavLink>
                        <NavLink className={({ isActive }) => isActive ? "nav-item nav-link active" : "nav-item nav-link"} to="/service">
                            Service
                        </NavLink>
                        <div className="nav-item dropdown">
                            <Link to="#"
                                className="nav-link dropdown-toggle"
                                data-bs-toggle="dropdown"
                            >
                                Pages
                            </Link>
                            <div className="dropdown-menu rounded-0 rounded-bottom m-0">
                                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/feature">
                                    Feature
                                </NavLink>
                                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/team">
                                    Our Doctor
                                </NavLink>
                                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/appointment">
                                    Appointment
                                </NavLink>
                                <NavLink className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} to="/testimonial">
                                    Testimonial
                                </NavLink>
                                
                            </div>
                        </div>
                        <NavLink className={({ isActive }) => isActive ? "nav-item nav-link active" : "nav-item nav-link"} to="/contact">
                            Contact
                        </NavLink>
                        
                      
                    </div>
                    <Link to="/appointment"
                        className="btn btn-primary rounded-0 py-4 px-lg-5 d-none d-lg-block"
                    >
                        Appointment
                        <i className="fa fa-arrow-right ms-3" />
                    </Link>
                </div>
            </nav>
            {/* Navbar End */}
        </>
    )
}