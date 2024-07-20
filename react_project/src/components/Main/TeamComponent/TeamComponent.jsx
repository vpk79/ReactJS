import { useEffect, useState } from 'react'
import ContactInfo from './ContactInfo.jsx'
import './TeamComponent.css'
import * as request from '../../../lib/request.js'
import * as urls from '../../../const/const.js';
import TeamCard from './TeamCard.jsx';

export default function TeamComponent() {

    const [employers, setEmployers] = useState([]);
    const [personData, setPersonData] = useState({});

    useEffect(() => {
        const getData = request.get(urls.EMPLOYERS)
            .then(data => setEmployers(data))
            .catch(err => console.log(err))
    }, []);

    const personDetails = (data) => {
        setPersonData(data);
    }


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
                        <div id="carouselTeamFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
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
                                        {employers.slice(4, 8).reverse().map((data, index) => (
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
            <ContactInfo data={personData} />

        </>
    )
}


// import { useEffect, useState, useRef } from 'react';
// import ContactInfo from './ContactInfo.jsx';
// import './TeamComponent.css';
// import * as request from '../../../lib/request.js';
// import * as urls from '../../../const/const.js';
// import TeamCard from './TeamCard.jsx';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// export default function TeamComponent() {
//     const [employers, setEmployers] = useState([]);
//     const [personData, setPersonData] = useState({});
//     const carouselRef = useRef(null);

//     useEffect(() => {
//         request.get(urls.EMPLOYERS)
//             .then(data => {
//                 setEmployers(data);
//                 if (carouselRef.current) {
//                     const carouselInstance = new bootstrap.Carousel(carouselRef.current, {
//                         interval: 3000,
//                         ride: 'carousel'
//                     });
//                     carouselInstance.cycle();
//                 }
//             })
//             .catch(err => console.log(err));
//     }, []);

//     useEffect(() => {
//         const handleScroll = () => {
//             window.scrollBy(0, 1);
//             window.scrollBy(0, -1);
//         };

//         const carouselElement = carouselRef.current;
//         if (carouselElement) {
//             carouselElement.addEventListener('slid.bs.carousel', handleScroll);
//         }

//         return () => {
//             if (carouselElement) {
//                 carouselElement.removeEventListener('slid.bs.carousel', handleScroll);
//             }
//         };
//     }, []);

//     const personDetails = (data) => {
//         setPersonData(data);
//     };

//     return (
//         <>
//             {/* Team Start */}
//             <div className="container-xxl py-5">
//                 <div className="container">
//                     <div
//                         className="text-center mx-auto mb-5 wow fadeInUp"
//                         data-wow-delay="0.1s"
//                         style={{ maxWidth: 600 }}
//                     >
//                         <p className="d-inline-block border rounded-pill py-1 px-4">Doctors</p>
//                         <h1>Our Experience Doctors</h1>
//                     </div>
//                     <div className="row g-4">
//                         <div id="carouselTeamFade" ref={carouselRef} className="carousel slide carousel-fade" data-bs-ride="carousel">
//                             <div className="carousel-inner">
//                                 <div className="carousel-item active">
//                                     <div className="row">
//                                         {employers.slice(0, 4).map((data, index) => (
//                                             <TeamCard key={data._id} data={data} delay={index * 200} personDetails={personDetails} />
//                                         ))}
//                                     </div>
//                                 </div>
//                                 <div className="carousel-item">
//                                     <div className="row">
//                                         {employers.slice(4, 8).reverse().map((data, index) => (
//                                             <TeamCard key={data._id} data={data} delay={index * 200} personDetails={personDetails} />
//                                         ))}
//                                     </div>
//                                 </div>
//                             </div>

//                             <button className="carousel-control-prev" type="button" data-bs-target="#carouselTeamFade" data-bs-slide="prev">
//                                 <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//                                 <span className="visually-hidden">Previous</span>
//                             </button>
//                             <button className="carousel-control-next" type="button" data-bs-target="#carouselTeamFade" data-bs-slide="next">
//                                 <span className="carousel-control-next-icon" aria-hidden="true"></span>
//                                 <span className="visually-hidden">Next</span>
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             {/* Team End */}
//             <ContactInfo data={personData} />
//         </>
//     );
// }
