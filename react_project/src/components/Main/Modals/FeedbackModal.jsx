import styles from './Feedback.module.css'


export default function FeedbackModal(){
    return(
        <>
            <div className="modal fade feedaback-modal" id="feedbackModal" tabIndex="-1" aria-labelledby="feedbackModalLabel" aria-hidden="true">
                <div className={`modal-dialog ${styles.feedbackDialog}`}>
                    <div className={`modal-content ${styles.feedbackContent}`}>
                        <div className="modal-header feedback-header">
                            <h5 className="modal-title" id="feedbackModalLabel">Post your comment</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body feedback-body">
                            ...
                        </div>
                        <div className="modal-footer feedback-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}