import { forwardRef, useContext, useEffect, useRef, useState } from 'react';
import styles from './Feedback.module.css'
import AuthContext from '../../../contexts/authContext';
import * as request from '../../../lib/request';
import { FEEDBACK } from '../../../const/const';
import { showErrorToast, showInfoToast, showSuccessToast } from '../../../Toasts/toastsMsg';


const FeedbackModal = forwardRef(({ updateFeedback, data }, ref) => {
    const { isAuthenticated, email, username, profileImage } = useContext(AuthContext);
    const [feedbackText, setFeedbackText] = useState('');
    const [profession, setProfession] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const btnClose = useRef(null);
    const textRef = useRef(null);
    const modalRef = useRef(null);

    const minChars = 20;
    const maxChars = 300;

    useEffect(() => {
        // console.log('newdata', data);
        if (data && data.editMode == true) {
            setEditMode(true);
            setFeedbackText(data.comment);
            setProfession(data.profession);
            console.log(data);
        }
    }, [data])

    useEffect(() => {
        const handleShown = () => {
            if (textRef.current) {
                textRef.current.focus();
            }
        };

        const modalElement = modalRef.current;
        if (modalElement) {
            modalElement.addEventListener('shown.bs.modal', handleShown);
        }

        // Cleanup the event listener on component unmount
        return () => {

            if (modalElement) {
                modalElement.removeEventListener('shown.bs.modal', handleShown);
                closeModal();
            }
        };
    }, []);

    const feedbackHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const feedbackText = formData.get('feedbackText');
        const profession = formData.get('profession');

        if (feedbackText === '' || profession === '') {
            showInfoToast('You cannot post empty comment!', { toastId: 'commentError' });
            return;
        }
        if (feedbackText.length < minChars || feedbackText.length > maxChars) {
            showInfoToast(`Comment must be between ${minChars} and ${maxChars} chars!`, { toastId: 'commentError2' });
            return;
        }
        if (profession.length < 5 || profession.length > 20) {
            showInfoToast(`Profession must be between 5 and 20 chars!`, { toastId: 'commentError3' });
            return;
        }

        if (editMode) {
            const editedData = new Object(data);
            editedData.comment = feedbackText;
            editedData.profession = profession;
            updateUserFeedback(editedData);
            console.log(editedData);
        } else {
            const newFeedback = {
                name: username,
                img: profileImage,
                profession,
                comment: feedbackText
            };
            postNewFeedback(newFeedback)
        }
    }

    async function postNewFeedback(data) {
        try {
            const postFeedback = await request.post(FEEDBACK, data);
            showSuccessToast('Thank you for your feedback!', { toastId: 'successFeedaback' });
            updateFeedback([postFeedback], false);
            closeModal();
            // console.log(postFeedback);

        } catch (error) {
            showErrorToast(error.message, { toastId: 'feedbackError' });
        }
    }

    async function updateUserFeedback(data) {
        try {
            const response = await request.patch(`${FEEDBACK}/${data._id}`, data);
            showSuccessToast('Feedback updated successfully!', { toastId: 'successFeedaback2' });
            updateFeedback([response], true);
            delete data.editMode;
            setEditMode(false);
            closeModal();
        } catch (error) {
            showErrorToast(error.message, { toastId: 'feedbackError2' });
        }
    }

    useEffect(() => {
        if (feedbackText.length > minChars && feedbackText.length < maxChars &&
            profession.length > 4 && profession.length < 21) {
            setBtnDisabled(false);
        } else {
            setBtnDisabled(true);
        }


    }, [feedbackText, profession])

    const handleFeedbackChange = (e) => {
        setFeedbackText(e.target.value);
    };

    const handleProfessionChange = (e) => {
        setProfession(e.target.value);
    };

    // const cancelEdit = () => {
    //     delete data.editMode;
    //     setEditMode(false);
    //     closeModal();
    // }

    const closeModal = () => {
        setBtnDisabled(true);
        setFeedbackText('');
        setProfession('');
        delete data.editMode;
        setEditMode(false);
        btnClose.current.click();
    }

    return (
        <>
            <div ref={ref} className="modal fade feedaback-modal" id="feedbackModal" tabIndex="-1" aria-labelledby="feedbackModalLabel" aria-hidden="true">
                <div className={`modal-dialog  ${styles.feedbackDialog}`}>
                    <div className={`modal-content bg-light ${styles.feedbackContent}`}>
                        <div className="modal-header feedback-header">
                            <h5 className={`modal-title ${styles.feedbackTitle}`} id="feedbackModalLabel">Your feedback is important to us!</h5>
                            <button ref={btnClose} onClick={closeModal} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                                    ref={textRef}
                                ></textarea>
                                <div className={styles.showChars}>
                                    <p>Chars left: {maxChars - feedbackText.length}</p>
                                    <p>Min:20&nbsp;&nbsp;&nbsp;Max:300</p>
                                </div>
                            </div>
                            <div className={`modal-footer ${styles.feedbackFooter}`}>
                                <div>
                                    <label htmlFor="profesion">*Your Profession:</label>
                                    <input
                                        type="text"
                                        name="profession"
                                        className='mx-2'
                                        minLength='5'
                                        maxLength='20'
                                        value={profession}
                                        onChange={handleProfessionChange} />
                                </div>
                                {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                                {!editMode && <button type="submit" className="btn btn-primary bg-primary text-white bg-gradient px-4" disabled={btnDisabled}>Send</button>
                                }
                                {editMode &&
                                    <div className='col-12 py-2 d-flex justify-content-center'>
                                        <button type="submit" className="btn btn-primary bg-primary mx-3 text-white bg-gradient px-4" disabled={btnDisabled}>Save</button>
                                        <button type="button" onClick={closeModal} className="btn btn-primary bg-primary text-white bg-gradient px-4" >Cancel</button>
                                    </div>}
                            </div>
                        </form>

                    </div>
                </div >
            </div >
        </>
    )
});

export default FeedbackModal;