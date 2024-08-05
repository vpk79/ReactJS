import { useEffect, useState, useRef, useContext } from 'react'
import ContactInfo from './ContactInfo.jsx'
import './TeamComponent.css'
import * as request from '../../../lib/request.js'
import * as urls from '../../../const/const.js';
import TeamCard from './TeamCard.jsx';
import AuthContext from '../../../contexts/authContext.js';
import * as toast from "../../../Toasts/toastsMsg.js"

export default function TeamComponent() {
    const { isAuthenticated } = useContext(AuthContext);

    const [employers, setEmployers] = useState([]);
    const [personData, setPersonData] = useState({});
    let [toggleContact, setToggleContact] = useState(false);
    const carouselRef = useRef(null);

    useEffect(() => {
        request.get(urls.EMPLOYERS)
            .then(data => {
                setEmployers(data);
            })
            .catch(err => {
                console.log(err.message);
                toast.showErrorToast(err.message, {toastId: 'requestError'})
            });
    }, [toggleContact]);

    const handleContactClick = () => {
        toggleContact = !toggleContact;
        setToggleContact(toggleContact);
    }

    // workaround for WOW problem with carousel - elements not show up until scrolling
    useEffect(() => {
        const handleScroll = () => {
            window.scrollBy(0, 1);
            window.scrollBy(0, -1);
        };

        const carouselElement = carouselRef.current;
        if (carouselElement) {
            carouselElement.addEventListener('slid.bs.carousel', handleScroll);
        }

        return () => {
            if (carouselElement) {
                carouselElement.removeEventListener('slid.bs.carousel', handleScroll);
            }
        };
    }, []);

    const personDetails = (data) => {
        if (!isAuthenticated) {
            toast.showInfoToast("You must login or register first!", {
                toastId: "login"
            })
            return;
        }
        setPersonData(data);
        handleContactClick();
    };

    return (
        <>
            {/* Team Start */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div
                        className="text-center mx-auto mb-5 wow fadeInUp"
                        data-wow-delay="0.1s"
                        style={{ maxWidth: 600 }}
                    >
                        <p className="d-inline-block border rounded-pill py-1 px-4">Doctors</p>
                        <h1>Our Experience Doctors</h1>
                    </div>
                    <div className="row g-4">
                        <div id="carouselTeamFade" ref={carouselRef} className="carousel team-carousel slide carousel-fade" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <div className="row">
                                        {employers.slice(0, 4).map((data, index) => (
                                            <TeamCard key={data._id} data={data} delay={index * 200} personDetails={personDetails} />
                                        ))}
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <div className="row">
                                        {employers.slice(4, 8).map((data, index) => (
                                            <TeamCard key={data._id} data={data} delay={index * 200} personDetails={personDetails} />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselTeamFade" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselTeamFade" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div >
            {/* Team End */}
            {handleContactClick && <ContactInfo data={personData} toggleContactForm={handleContactClick} />}

        </>
    )
}


