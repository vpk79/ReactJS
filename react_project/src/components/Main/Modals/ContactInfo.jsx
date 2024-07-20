import './ContactInfo.css'

export default function ContactInfo() {
    return (
        <>
            <div className="modal fade" id="contactInfoModal" tabindex="-1" aria-labelledby="contactInfoModal" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="image-section">
                                <div className="image-wrapper">
                                    <img src="img/team-1.jpg" alt=""></img>
                                </div>
                                    <p>Doctor Name</p>
                                    <p>Department</p>
                            </div>
                            
                            <div className="messages-wrapper">
                                <textarea name="" id="" cols="30" rows="10"></textarea>
                            </div>
                            <div className="close-modal">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                        </div>
                        <div className="modal-body">
                            {/* Nav tabs */}
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button
                                        className="nav-link active"
                                        id="about-tab"
                                        data-bs-toggle="tab"
                                        data-bs-target="#about"
                                        type="button"
                                        role="tab"
                                        aria-controls="about"
                                        aria-selected="true"
                                    >
                                        About
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button
                                        className="nav-link"
                                        id="profile-tab"
                                        data-bs-toggle="tab"
                                        data-bs-target="#profile"
                                        type="button"
                                        role="tab"
                                        aria-controls="profile"
                                        aria-selected="false"
                                    >
                                        Profile
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button
                                        className="nav-link"
                                        id="contact-tab"
                                        data-bs-toggle="tab"
                                        data-bs-target="#contact"
                                        type="button"
                                        role="tab"
                                        aria-controls="contact"
                                        aria-selected="false"
                                    >
                                        Contact
                                    </button>
                                </li>
                            </ul>
                            {/* Tab panes */}
                            <div className="tab-content" id="myTabContent">
                                <div
                                    className="tab-pane fade show active"
                                    id="about"
                                    role="tabpanel"
                                    aria-labelledby="about-tab"
                                >
                                    <p>SPECIALITY</p>
                                    <p>EDUCATION</p>
                                    <p>CERTIFICATIONS</p>
                                    <p>SKILLS</p>

                                </div>
                                <div
                                    className="tab-pane fade"
                                    id="profile"
                                    role="tabpanel"
                                    aria-labelledby="profile-tab"
                                >
                                    <p>This is the profile tab content.</p>
                                </div>
                                <div
                                    className="tab-pane fade"
                                    id="contact"
                                    role="tabpanel"
                                    aria-labelledby="contact-tab"
                                >
                                    <p>This is the contact tab content.</p>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


