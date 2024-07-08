import { Link } from "react-router-dom";
import styles from './Topbar.module.css';

export default function Topbar(){
    return(
        <>
            {/* Topbar Start */}
            <div
                className="topbar container-fluid bg-light p-0 wow fadeIn"
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
                        <div className="h-100 d-inline-flex align-items-center py-1 me-4">
                            <div className="h-100 d-inline-flex align-items-center me-4">
                                Do you have an account?&nbsp;&nbsp;&nbsp;&nbsp;
                                <button className="btn btn-primary btn-sm" data-bs-toggle="modal"
                                    data-bs-target="#LoginModal">Login</button>
                                &nbsp;&nbsp;&nbsp;or&nbsp;&nbsp;&nbsp;
                                <button className="btn btn-primary btn-sm" data-bs-toggle="modal"
                                    data-bs-target="#RegisterModal">Register</button>
                            </div>
                          
                            <small className="fa fa-phone-alt text-primary me-2" />
                            <small>+012 345 6789</small>
                        </div>
                        <div className="h-100 d-inline-flex align-items-center">
                            <Link to="https://www.facebook.com"  className="btn btn-sm-square rounded-circle bg-white text-primary me-1"
                                
                            >
                                <i className="fab fa-facebook-f" />
                            </Link>
                            <Link to="https://twitter.com" className="btn btn-sm-square rounded-circle bg-white text-primary me-1"
                                
                            >
                                <i className="fab fa-twitter" />
                            </Link>
                            <Link to="https://linkedin.com" className="btn btn-sm-square rounded-circle bg-white text-primary me-1"
                               
                            >
                                <i className="fab fa-linkedin-in" />
                            </Link>
                            <Link to="https://instagram.com" className="btn btn-sm-square rounded-circle bg-white text-primary me-0"
                                
                            >
                                <i className="fab fa-instagram" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* Topbar End */}

            {/* Login-Modal */}
            <div
                
                className="modal fade"
                id="LoginModal"
                tabIndex={-1}
                aria-labelledby="LoginModal"
                aria-hidden="true"

            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className={`${styles.loginModal} modal-content`}>
                        <div className={`${styles.modalHeader} modal-header`}>
                            <h5 className="modal-title" id="LoginModalLabel">
                                Login
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <form className={styles.loginForm}>
                            <div className="row mb-3">
                                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                                    Email
                                </label>
                                <div className={`${styles.emailInput} col-sm-9`}>
                                    <input type="email" className="form-control" id="inputEmail3" />
                                </div>
                            </div>
                            <div className={`${styles.formInputs} row mb-3`}>
                                <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
                                    Password
                                </label>
                                <div className="col-sm-9">
                                    <input type="password" className="form-control" id="inputPassword3" />
                                </div>
                            </div>
                            <button type="submit" className={`${styles.btnLogin} btn btn-primary`}>
                                Sign in
                            </button>
                        </form>

                        <p style={{textAlign: 'center', marginTop:'-50px', marginBottom:'-40px'}}>Not have an account?&nbsp;&nbsp;<span><a className="btn" data-bs-toggle="modal"
                            data-bs-target="#RegisterModal">Register</a></span></p>
                    </div>
                </div>
            </div>

            {/* Register-Modal */}
            <div
                className="modal fade"
                id="RegisterModal"
                tabIndex={-1}
                aria-labelledby="RegisterModal"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="RegisterLabel">
                                Modal title
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">...</div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button type="button" className="btn btn-primary">
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}