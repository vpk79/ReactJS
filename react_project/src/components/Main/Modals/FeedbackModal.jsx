import { useContext, useRef, useState } from 'react';
import styles from './Feedback.module.css'
import AuthContext from '../../../contexts/authContext';
import * as request from '../../../lib/request';
import { FEEDBACK } from '../../../const/const';
import { showErrorToast, showSuccessToast } from '../../../Toasts/toastsMsg';


export default function FeedbackModal({ updateFeedback }) {
    const { isAuthenticated, email, username, profileImage } = useContext(AuthContext);
    const [feedbackText, setFeedbackText] = useState('');
    const [profession, setProfession] = useState('');
    const btnClose = useRef(null);

    const maxChars = 300;

    const feedbackHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const feedbackText = formData.get('feedbackText');
        const profession = formData.get('profession');

        const newFeedback = {
            name: username,
            img: profileImage,
            profession,
            comment: feedbackText
        };
        try {
            const postFeedback = await request.post(FEEDBACK, newFeedback);
            showSuccessToast('Thank you for your feedback!', { toastId: 'successFeedaback' });
            updateFeedback(postFeedback);
            closeModal();
            // console.log(postFeedback);

        } catch (error) {
            showErrorToast(error.message, { toastId: 'feedbackError' });
        }

    }
    const handleFeedbackChange = (e) => {
        setFeedbackText(e.target.value);
    };

    const handleProfessionChange = (e) => {
        setProfession(e.target.value);
    };

    const closeModal = () => {
        btnClose.current.click();
        setFeedbackText('');
        setProfession('');
    }

    return (
        <>
            <div className="modal fade feedaback-modal " id="feedbackModal" tabIndex="-1" aria-labelledby="feedbackModalLabel" aria-hidden="true">
                <div className={`modal-dialog  ${styles.feedbackDialog}`}>
                    <div className={`modal-content bg-light ${styles.feedbackContent}`}>
                        <div className="modal-header feedback-header">
                            <h5 className={`modal-title ${styles.feedbackTitle}`} id="feedbackModalLabel">Your feedback is important to us!</h5>
                            <button ref={btnClose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={feedbackHandler}>
                            <div className="modal-body feedback-body">
                                <textarea
                                    name="feedbackText"
                                    id="feedbackText"
                                    className={styles.feedbackTextarea}
                                    placeholder='AaBb...'
                                    cols="50" rows="6"
                                    minLength='20'
                                    maxLength={maxChars}
                                    value={feedbackText}
                                    onChange={handleFeedbackChange}
                                ></textarea>
                                <div className={styles.showChars}>
                                    <p>Chars left: {maxChars - feedbackText.length}</p>
                                    <p>Min:20&nbsp;&nbsp;&nbsp;Max:300</p>
                                </div>
                            </div>
                            <div className={`modal-footer ${styles.feedbackFooter}`}>
                                <div>
                                    <label htmlFor="profesion">Your Profession:</label>
                                    <input
                                        type="text"
                                        name="profession"
                                        className='mx-2'
                                        value={profession}
                                        onChange={handleProfessionChange} />
                                </div>
                                {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                                <button type="submit" className="btn btn-primary px-4">Send</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}