import { Link } from "react-router-dom";

export default function Topbar(){
    return(
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
                        <div className="h-100 d-inline-flex align-items-center py-1 me-4">
                            <div className="h-100 d-inline-flex align-items-center me-4">
                                Do you have an account?&nbsp;&nbsp;&nbsp;&nbsp;<Link to="/login" className="btn btn-primary btn-sm">Login</Link>&nbsp;&nbsp;&nbsp;or&nbsp;&nbsp;&nbsp;<Link to="/register" className="btn btn-primary btn-sm">Register</Link>
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
        </>
    )
}