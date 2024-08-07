import { useContext, useEffect } from "react";
import AuthContext from "../../contexts/authContext";
import useForm from "../../hooks/useForm";

const ContactFormKeys = {
    Name: 'Name',
    Email: 'Email',
    Subject: 'Subject',
    Message: 'Message'
}

export default function ContactPage() {

    const { isAuthenticated, contactUsHandler, username, email } = useContext(AuthContext);

    const intialValues = {
        [ContactFormKeys.Name]: username || '',
        [ContactFormKeys.Email]: email || '',
        [ContactFormKeys.Subject]: '',
        [ContactFormKeys.Message]: '',
    };

    const { values, onChange, onSubmit, setValues } = useForm(contactUsHandler, intialValues);

useEffect(()=> {
    setValues(intialValues);

    return (() => {
        setValues(intialValues);

    })
}, [])

    return (
        <>
            {/* Page Header Start */}
            {/* <ContactHeader /> */}
            {/* Page Header End */}

            {/* Contact Start */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-lg-4">
                            <div className="h-100 bg-light rounded d-flex align-items-center p-5">
                                <div
                                    className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-white"
                                    style={{ width: 55, height: 55 }}
                                >
                                    <i className="fa fa-map-marker-alt text-primary" />
                                </div>
                                <div className="ms-4">
                                    <p className="mb-2">Address</p>
                                    <h5 className="mb-0">123 Street, New York, USA</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="h-100 bg-light rounded d-flex align-items-center p-5">
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
                        </div>
                        <div className="col-lg-4">
                            <div className="h-100 bg-light rounded d-flex align-items-center p-5">
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
                        <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                            <div className="bg-light rounded p-5">
                                <p className="d-inline-block border rounded-pill py-1 px-4">
                                    Contact Us
                                </p>
                                <h1 className="mb-4">Have Any Query? Please Contact Us!</h1>
                               
                                <form onSubmit={onSubmit} id="messagesForm">
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="name"
                                                    placeholder="Your Name"
                                                    name={ContactFormKeys.Name}
                                                    value={values[ContactFormKeys.Name]}
                                                    onChange={onChange}
                                                    disabled={!isAuthenticated}
                                                />
                                                <label htmlFor="name">Your Name</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="email"
                                                    placeholder="Your Email"
                                                    name={ContactFormKeys.Email}
                                                    value={values[ContactFormKeys.Email]}
                                                    onChange={onChange}
                                                    disabled={!isAuthenticated}
                                                />
                                                <label htmlFor="email">Your Email</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="messageSubject"
                                                    placeholder="Subject"
                                                    name={ContactFormKeys.Subject}
                                                    value={values[ContactFormKeys.Subject]}
                                                    onChange={onChange}
                                                    disabled={!isAuthenticated}
                                                />
                                                <label htmlFor="subject">Subject</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <textarea
                                                    className="form-control"
                                                    placeholder="Leave a message here"
                                                    id="messagesArea"
                                                    style={{ height: 130 }}
                                                    
                                                    name={ContactFormKeys.Message}
                                                    value={values[ContactFormKeys.Message]}
                                                    onChange={onChange}
                                                    disabled={!isAuthenticated}
                                                />
                                                <label htmlFor="message">Message</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <button className="btn btn-primary w-100 py-3" type="submit" disabled={!isAuthenticated}>
                                                Send Message
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                            <div className="h-100" style={{ minHeight: 400 }}>
                                <iframe
                                    className="rounded w-100 h-100"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001156.4288297426!2d-78.01371936852176!3d42.72876761954724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ccc4bf0f123a5a9%3A0xddcfc6c1de189567!2sNew%20York%2C%20USA!5e0!3m2!1sen!2sbd!4v1603794290143!5m2!1sen!2sbd"
                                    frameBorder={0}
                                    allowFullScreen=""
                                    aria-hidden="false"
                                    tabIndex={0}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Contact End */}

        </>
    )
}