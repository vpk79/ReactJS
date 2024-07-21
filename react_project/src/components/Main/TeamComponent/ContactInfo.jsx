import { useContext, useEffect, useState } from 'react';
import './ContactInfo.css'
import AuthContext from '../../../contexts/authContext';

export default function ContactInfo({ data }) {
    const { isAuthenticated, email, userId } = useContext(AuthContext);
    const [personData, setPersonData] = useState(data);

    useEffect(() => {
        setPersonData(data);
    }, [data]);


    function messageHandler(e){
        e.preventDefault();

        const textarea = e.target.elements.msgArea;
        const msg = textarea.value;

        
        console.log(userId);
        console.log(textarea.value);
    }

    return (
        <>
            {personData && (

                <div className="modal fade" id="contactInfoModal" tabIndex="-1" aria-labelledby="contactInfoModal" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <div className="image-section">
                                    <div className="image-wrapper">
                                        <img src={personData.imageUrl} alt=""></img>
                                    </div>
                                    <p className='person-name'>{personData.name}&nbsp;{personData.title}</p>
                                    <p className='person-department'>{personData.department}</p>
                                </div>

                                <div className="messages-wrapper">
                                    <textarea name="" id="" cols="30" rows="10" disabled={true}></textarea>
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
                                            id="summary-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#summary"
                                            type="button"
                                            role="tab"
                                            aria-controls="summary"
                                            aria-selected="false"
                                        >
                                            Summary
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
                                            Contacts
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className="nav-link"
                                            id="message-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#message"
                                            type="button"
                                            role="tab"
                                            aria-controls="message"
                                            aria-selected="false"
                                        >
                                            Message
                                        </button>
                                    </li>
                                    <li className="nav-item add-to-favorites" role="presentation">
                                        <button
                                            className="btn btn-primary add-to-favorites-btn"
                                            id="add-to-favorites-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#add-to-favorites"
                                            type="button"
                                            role="tab"
                                            aria-controls="message"
                                            aria-selected="false"
                                        >
                                            Add to favorites
                                        </button>
                                    </li>
                                </ul>
                                {/* Tab panes */}
                                <div className="tab-content" id="myTabContent">
                                    <div
                                        className="tab-pane fade show active person-about"
                                        id="about"
                                        role="tabpanel"
                                        aria-labelledby="about-tab"
                                    >
                                        {
                                            personData.info && (
                                                <p><i className="fas fa-info-circle"></i>&nbsp;{personData.info['about']}</p>
                                            )
                                        }
                                        <ul>
                                            {
                                                personData.info && (
                                                    personData.info['facts'].map((data, index) => (
                                                        <li key={index}>{data}</li>
                                                    ))
                                                )
                                            }
                                        </ul>
                                    </div>
                                    <div
                                        className="tab-pane fade person-summary"
                                        id="summary"
                                        role="tabpanel"
                                        aria-labelledby="summary-tab"
                                    >
                                        <p>SPECIALITY</p>
                                        <ul>
                                            {
                                                personData.info && (
                                                    <li>{personData.info.summary.speciality}</li>
                                                )
                                            }
                                        </ul>
                                        <p>EDUCATION</p>
                                        <ul>
                                            {
                                                personData.info && (
                                                    <li>{personData.info.summary.education}</li>
                                                )
                                            }
                                        </ul>
                                        <p>CERTIFICATIONS</p>
                                        <ul>
                                            {
                                                personData.info && (
                                                    personData.info.summary['certifications'].map((data, index) => (
                                                        <li key={index}>{data}</li>
                                                    ))
                                                )
                                            }
                                        </ul>
                                        <p>SKILLS</p>
                                        <ul>
                                            {
                                                personData.info && (
                                                    <li>{personData.info.summary.skills}</li>
                                                )
                                            }
                                        </ul>

                                    </div>
                                    <div
                                        className="tab-pane fade person-contact"
                                        id="contact"
                                        role="tabpanel"
                                        aria-labelledby="contact-tab"
                                    >
                                        {personData.info && (
                                            <ul>
                                                <li><i className="fas fa-phone"></i>&nbsp;&nbsp;&nbsp;<a href={`tel:${personData.info.contacts.phone}`}>{personData.info.contacts.phone}</a></li>
                                                <li><i className="far fa-envelope"></i>&nbsp;&nbsp;&nbsp;<a href={`mailto:${personData.info.contacts.email}`} target="_blank">{personData.info.contacts.email}</a></li>
                                                <li><i className="fab fa-linkedin-in"></i>&nbsp;&nbsp;&nbsp;<a href="http://linkedin.com" target="_blank">{personData.info.contacts.linkedin}</a></li>
                                                <li><i className="fab fa-twitter"></i>&nbsp;&nbsp;&nbsp;<a href="http://twitter.com" target="_blank">{personData.info.contacts.twitter}</a></li>
                                            </ul>
                                        )
                                            
                                        }
                                    </div>
                                    <div
                                        className="tab-pane fade person-message"
                                        id="message"
                                        role="tabpanel"
                                        aria-labelledby="message-tab"
                                    >
                                        <div className='person-message-wrapper'>
                                            <p>You can leave me a message. I`ll respond ASAP.</p>
                                            <form className='msgForm' onSubmit={messageHandler}>
                                                <textarea name="msgArea" id="msgArea" cols="40" rows="5"></textarea>
                                                <button type="btn btn-submit" className='btn  btn-primary'>Send</button>
                                            </form>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div> */}
                        </div>
                    </div>
                </div>

            )
            }

        </>
    )
}


