import styles from './Feedback.module.css'


export default function FeedbackModal() {

    function feedbackHandler(e){
        e.preventDefault();
        const newData = new FormData(event.target);

        const text = newData.get('feedbackText');
        const profession = newData.get('profession')
        console.log(text);
        console.log(profession);
    }




    return (
        <>
            <div className="modal fade feedaback-modal " id="feedbackModal" tabIndex="-1" aria-labelledby="feedbackModalLabel" aria-hidden="true">
                <div className={`modal-dialog  ${styles.feedbackDialog}`}>
                    <div className={`modal-content bg-light ${styles.feedbackContent}`}>
                        <div className="modal-header feedback-header">
                            <h5 className={`modal-title ${styles.feedbackTitle}`} id="feedbackModalLabel">Your feedback is important to us!</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={feedbackHandler}>
                            <div className="modal-body feedback-body">
                                <textarea name="feedbackText" id="" className={styles.feedbackTextarea} placeholder='AaBb...' cols="50" rows="6"></textarea>
                            </div>
                            <div className={`modal-footer ${styles.feedbackFooter}`}>
                                <div>
                                    <label htmlFor="profesion">Your Profession:</label>
                                    <input type="text" name="profession" className='mx-2' />
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