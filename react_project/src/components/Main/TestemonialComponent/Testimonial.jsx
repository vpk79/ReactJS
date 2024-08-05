import React, { useContext, useEffect, useRef, useState } from 'react';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './Testimonial.css';
import OwlCarousel from 'react-owl-carousel';
import { options } from './carousel';
import AuthContext from '../../../contexts/authContext';
import { FEEDBACK } from '../../../const/const';
import * as request from '../../../lib/request';
import { showErrorToast } from '../../../Toasts/toastsMsg';
import TestemonialCard from './TestimonialCard';
import FeedbackModal from '../Modals/FeedbackModal';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export default function Testemonial() {
    const { isAuthenticated, email, username, profileImage } = useContext(AuthContext);
    const [feedback, setFeedback] = useState([]);
    const [carouselKey, setCarouselKey] = useState(0);
    const modalRef = useRef(null);
    const[modalData, setModalData] = useState(null);

    const openFeedbackModal = (data) => {
        setModalData(state => ({...state, ...data}));
        setTimeout(() => {
            const modalElement = modalRef.current;
            if (modalElement) {
                const modal = new window.bootstrap.Modal(modalElement);
                modal.show();
            }
        }, 100);
      
    };

    useEffect(() => {
        const loadComments = async () => {
            try {
                const getData = await request.get(FEEDBACK);
                // console.log(getData);
                setFeedback(getData.sort((a, b) => b._createdOn - a._createdOn));
            } catch (error) {
                showErrorToast(error.message, { toastId: 'feedbackError' })
            }
        }
        loadComments();
    }, [])

    const updateFeedback = (data, edited) => {
        if(edited){
            const temp = feedback.slice();
            const id = data[0]._id;
            const index = temp.findIndex(x => x._id === id);
            temp[index] = data[0];
            setFeedback(temp.sort((a, b) => b._createdOn - a._createdOn));
        } else  if(data.length > 1) {
            setFeedback(data.slice());
        } else {
            setFeedback(state => ([...state, ...data].sort((a, b) => b._createdOn - a._createdOn)));
        }
    }

    // !!! re-initiliaze carousel with new items.
    // changing key force react to re-render again,
    // need two re-renders to load new items

    useEffect(() => {
        // console.log('feedback', feedback);
        setCarouselKey(prevKey => prevKey + 1);
    }, [feedback]);

    return (
        <>
            {/* Testimonial Start */}
            {feedback.length > 0 && <div className="container-xxl py-5">
                <div className="container d-flex flex-column align-items-center ">
                    <div
                        className="text-center mx-auto mb-5 wow fadeInUp"
                        data-wow-delay="0.1s"
                        style={{ maxWidth: 600 }}
                    >
                        <p className="d-inline-block border rounded-pill py-1 px-4">
                            Testimonial
                        </p>
                        <h1>What Say Our Patients!</h1>
                    </div>
                    <OwlCarousel key={carouselKey}  className="owl-carousel testimonial-carousel wow fadeInUp owl-theme" {...options}>
                        {feedback.map(data => (<TestemonialCard openFeedbackModal={openFeedbackModal} key={data._id} data={data} feedback={feedback} updateFeedback={updateFeedback} />))}
                    </OwlCarousel>
                    <div className='my-5'>
                        {isAuthenticated && <button className='btn commentBtn btn-primary my-5 bg-primary text-white bg-gradient' data-bs-toggle="modal" data-bs-target="#feedbackModal">Comment</button>}
                        {!isAuthenticated && <>
                            <h5>You must  <button className="btn btn-primary btn-sm" data-bs-toggle="modal"
                                data-bs-target="#Login">Login</button>
                                &nbsp;&nbsp;&nbsp;or&nbsp;&nbsp;&nbsp;
                                <button className="btn btn-primary btn-sm" data-bs-toggle="modal"
                                    data-bs-target="#Register">Register</button>&nbsp;&nbsp;to make a comment.</h5>
                        </>}
                    </div>
                </div>
                <FeedbackModal updateFeedback={updateFeedback} ref={modalRef} data={modalData} />
            </div>}
            {/* Testimonial End */}
        </>
    );
}
